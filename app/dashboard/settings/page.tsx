'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Save, ShieldAlert } from 'lucide-react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

// ─── Schemas ─────────────────────────────────────────────────────────────────

const profileSchema = z.object({
  fullName: z.string().min(2, 'Veuillez entrer votre nom complet'),
})

const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Au moins 8 caractères')
      .regex(/[A-Z]/, 'Au moins une majuscule')
      .regex(/[0-9]/, 'Au moins un chiffre'),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: 'Les mots de passe ne correspondent pas',
    path: ['confirm'],
  })

type ProfileData = z.infer<typeof profileSchema>
type PasswordData = z.infer<typeof passwordSchema>

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getInitials(user: User): string {
  const name: string = user.user_metadata?.full_name ?? user.email ?? ''
  return name
    .split(/[\s@]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s: string) => s[0].toUpperCase())
    .join('')
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const supabase = createClient()
  const [user, setUser] = useState<User | null>(null)
  const [profileSaved, setProfileSaved] = useState(false)
  const [passwordSaved, setPasswordSaved] = useState(false)
  const [profileError, setProfileError] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)

  const profileForm = useForm<ProfileData>({
    resolver: zodResolver(profileSchema),
    defaultValues: { fullName: '' },
  })
  const passwordForm = useForm<PasswordData>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '', confirm: '' },
  })

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user)
        profileForm.reset({
          fullName: data.user.user_metadata?.full_name ?? '',
        })
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function onProfileSubmit(data: ProfileData) {
    setProfileError(null)
    setProfileSaved(false)
    const { error } = await supabase.auth.updateUser({
      data: { full_name: data.fullName },
    })
    if (error) {
      setProfileError('Impossible de mettre à jour le profil.')
    } else {
      setProfileSaved(true)
      setTimeout(() => setProfileSaved(false), 3000)
    }
  }

  async function onPasswordSubmit(data: PasswordData) {
    setPasswordError(null)
    setPasswordSaved(false)
    const { error } = await supabase.auth.updateUser({ password: data.password })
    if (error) {
      setPasswordError('Impossible de modifier le mot de passe.')
    } else {
      passwordForm.reset()
      setPasswordSaved(true)
      setTimeout(() => setPasswordSaved(false), 3000)
    }
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-4 md:p-6">
      {/* Header */}
      <header className="flex items-center gap-3">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="h-4" />
        <div>
          <h1 className="text-lg font-semibold text-foreground">Paramètres</h1>
          <p className="text-xs text-muted-foreground">
            Gérez votre profil et votre compte
          </p>
        </div>
      </header>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Profile card */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
              <CardHeader>
                <CardTitle className="text-base">Profil</CardTitle>
                <CardDescription>
                  Votre nom est visible dans le dashboard et les emails.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Avatar preview */}
                <div className="flex items-center gap-4">
                  <Avatar className="size-14 rounded-xl">
                    <AvatarFallback className="rounded-xl bg-accent/20 text-accent text-lg font-bold">
                      {user ? getInitials(user) : '…'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {user?.user_metadata?.full_name ?? '—'}
                    </p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="fullName">Nom complet</Label>
                  <Input
                    id="fullName"
                    placeholder="Jean Dupont"
                    {...profileForm.register('fullName')}
                    className="bg-input border-border"
                  />
                  {profileForm.formState.errors.fullName && (
                    <p className="text-xs text-destructive-foreground">
                      {profileForm.formState.errors.fullName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="email">Adresse e-mail</Label>
                  <Input
                    id="email"
                    value={user?.email ?? ''}
                    readOnly
                    disabled
                    className="bg-input/50 border-border text-muted-foreground cursor-not-allowed"
                  />
                  <p className="text-xs text-muted-foreground">
                    L'e-mail ne peut pas être modifié ici.
                  </p>
                </div>

                {profileError && (
                  <p className="text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                    {profileError}
                  </p>
                )}
              </CardContent>
              <CardFooter className="border-t border-border/30 pt-4 flex items-center gap-3">
                <Button
                  type="submit"
                  disabled={profileForm.formState.isSubmitting}
                >
                  {profileForm.formState.isSubmitting ? (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 size-4" />
                  )}
                  Enregistrer
                </Button>
                {profileSaved && (
                  <span className="text-sm text-emerald-400">
                    Profil mis à jour ✓
                  </span>
                )}
              </CardFooter>
            </form>
          </Card>

          {/* Password card */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
              <CardHeader>
                <CardTitle className="text-base">Mot de passe</CardTitle>
                <CardDescription>
                  Choisissez un mot de passe fort d'au moins 8 caractères.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="password">Nouveau mot de passe</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    {...passwordForm.register('password')}
                    className="bg-input border-border"
                  />
                  {passwordForm.formState.errors.password && (
                    <p className="text-xs text-destructive-foreground">
                      {passwordForm.formState.errors.password.message}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="confirm">Confirmer le mot de passe</Label>
                  <Input
                    id="confirm"
                    type="password"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    {...passwordForm.register('confirm')}
                    className="bg-input border-border"
                  />
                  {passwordForm.formState.errors.confirm && (
                    <p className="text-xs text-destructive-foreground">
                      {passwordForm.formState.errors.confirm.message}
                    </p>
                  )}
                </div>

                {passwordError && (
                  <p className="text-sm text-destructive-foreground bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2">
                    {passwordError}
                  </p>
                )}
              </CardContent>
              <CardFooter className="border-t border-border/30 pt-4 flex items-center gap-3">
                <Button
                  type="submit"
                  disabled={passwordForm.formState.isSubmitting}
                >
                  {passwordForm.formState.isSubmitting ? (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  ) : (
                    <Save className="mr-2 size-4" />
                  )}
                  Modifier le mot de passe
                </Button>
                {passwordSaved && (
                  <span className="text-sm text-emerald-400">
                    Mot de passe modifié ✓
                  </span>
                )}
              </CardFooter>
            </form>
          </Card>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* Account info */}
          <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-sm">Informations du compte</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">ID utilisateur</span>
                <span className="font-mono text-xs text-foreground truncate max-w-28">
                  {user?.id?.slice(0, 8)}…
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Membre depuis</span>
                <span className="text-foreground">
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString('fr-FR', {
                        month: 'short',
                        year: 'numeric',
                      })
                    : '—'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Dernière connexion</span>
                <span className="text-foreground">
                  {user?.last_sign_in_at
                    ? new Date(user.last_sign_in_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'short',
                      })
                    : '—'}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Danger zone */}
          <Card className="border-destructive/30 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sm text-destructive">
                <ShieldAlert className="size-4" />
                Zone de danger
              </CardTitle>
              <CardDescription>
                La suppression de votre compte est irréversible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                variant="outline"
                className="w-full border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive text-sm"
                type="button"
              >
                Supprimer mon compte
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
