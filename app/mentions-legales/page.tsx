"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/" 
            className="mb-8 inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour à l&apos;accueil
          </Link>

          <h1 className="text-4xl font-bold text-foreground mb-8">Mentions Légales</h1>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Éditeur du site</h2>
              <p className="text-muted-foreground leading-relaxed">
                Le site RankFlow AI est édité par :<br /><br />
                <strong className="text-foreground">RankFlow SAS</strong><br />
                Société par Actions Simplifiée au capital de 10 000 €<br />
                Siège social : [Adresse à compléter]<br />
                RCS : [Numéro RCS à compléter]<br />
                SIRET : [Numéro SIRET à compléter]<br />
                TVA Intracommunautaire : [Numéro TVA à compléter]<br /><br />
                Directeur de la publication : [Nom du directeur à compléter]<br />
                Email : contact@rankflow.ai<br />
                Téléphone : [Numéro à compléter]
              </p>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Hébergement</h2>
              <p className="text-muted-foreground leading-relaxed">
                Le site est hébergé par :<br /><br />
                <strong className="text-foreground">Vercel Inc.</strong><br />
                340 S Lemon Ave #4133<br />
                Walnut, CA 91789<br />
                États-Unis<br />
                Site web : vercel.com
              </p>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Propriété intellectuelle</h2>
              <p className="text-muted-foreground leading-relaxed">
                L&apos;ensemble du contenu de ce site (textes, images, vidéos, logos, icônes, sons, logiciels, etc.) 
                est la propriété exclusive de RankFlow SAS ou de ses partenaires et est protégé par les lois 
                françaises et internationales relatives à la propriété intellectuelle.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Toute reproduction, représentation, modification, publication, adaptation de tout ou partie 
                des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf 
                autorisation écrite préalable de RankFlow SAS.
              </p>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Limitation de responsabilité</h2>
              <p className="text-muted-foreground leading-relaxed">
                RankFlow SAS s&apos;efforce d&apos;assurer l&apos;exactitude et la mise à jour des informations 
                diffusées sur ce site. Toutefois, RankFlow SAS ne peut garantir l&apos;exactitude, la précision 
                ou l&apos;exhaustivité des informations mises à disposition sur ce site.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                En conséquence, RankFlow SAS décline toute responsabilité pour les éventuelles imprécisions, 
                inexactitudes ou omissions portant sur des informations disponibles sur ce site.
              </p>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Liens hypertextes</h2>
              <p className="text-muted-foreground leading-relaxed">
                Le site peut contenir des liens hypertextes vers d&apos;autres sites. RankFlow SAS n&apos;exerce 
                aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
              </p>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Droit applicable</h2>
              <p className="text-muted-foreground leading-relaxed">
                Les présentes mentions légales sont soumises au droit français. En cas de litige, 
                les tribunaux français seront seuls compétents.
              </p>
            </section>

            <p className="text-sm text-muted-foreground">
              Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
