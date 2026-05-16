"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PolitiqueConfidentialite() {
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

          <h1 className="text-4xl font-bold text-foreground mb-8">Politique de Confidentialité</h1>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                RankFlow SAS (ci-après « nous », « notre » ou « RankFlow ») s&apos;engage à protéger 
                la vie privée des utilisateurs de son site web et de ses services. Cette politique 
                de confidentialité explique comment nous collectons, utilisons, partageons et protégeons 
                vos données personnelles conformément au Règlement Général sur la Protection des Données (RGPD).
              </p>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. Responsable du traitement</h2>
              <p className="text-muted-foreground leading-relaxed">
                Le responsable du traitement des données est :<br /><br />
                <strong className="text-foreground">RankFlow SAS</strong><br />
                [Adresse à compléter]<br />
                Email : privacy@rankflow.ai<br />
                DPO : [Nom du DPO à compléter]
              </p>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Données collectées</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Nous collectons les catégories de données suivantes :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong className="text-foreground">Données d&apos;identification :</strong> nom, prénom, adresse email, numéro de téléphone</li>
                <li><strong className="text-foreground">Données professionnelles :</strong> nom de l&apos;entreprise, fonction, secteur d&apos;activité</li>
                <li><strong className="text-foreground">Données de connexion :</strong> adresse IP, type de navigateur, pages visitées</li>
                <li><strong className="text-foreground">Données de paiement :</strong> informations bancaires (traitées par notre prestataire Stripe)</li>
                <li><strong className="text-foreground">Données d&apos;utilisation :</strong> interactions avec nos services, préférences</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Finalités du traitement</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Vos données sont collectées pour les finalités suivantes :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Fourniture et gestion de nos services</li>
                <li>Gestion de la relation client et support</li>
                <li>Facturation et paiements</li>
                <li>Envoi de communications marketing (avec votre consentement)</li>
                <li>Amélioration de nos services et analyse statistique</li>
                <li>Respect de nos obligations légales</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. Base légale du traitement</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Le traitement de vos données repose sur les bases légales suivantes :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong className="text-foreground">Exécution du contrat :</strong> pour la fourniture de nos services</li>
                <li><strong className="text-foreground">Consentement :</strong> pour les communications marketing et les cookies non essentiels</li>
                <li><strong className="text-foreground">Intérêt légitime :</strong> pour l&apos;amélioration de nos services et la sécurité</li>
                <li><strong className="text-foreground">Obligation légale :</strong> pour la facturation et les obligations comptables</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Durée de conservation</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous conservons vos données personnelles pendant la durée nécessaire aux finalités 
                pour lesquelles elles ont été collectées :<br /><br />
                • Données clients : durée de la relation contractuelle + 3 ans<br />
                • Données de facturation : 10 ans (obligation légale)<br />
                • Données de prospection : 3 ans à compter du dernier contact<br />
                • Cookies : 13 mois maximum
              </p>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Vos droits</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li><strong className="text-foreground">Droit d&apos;accès :</strong> obtenir la confirmation du traitement et une copie de vos données</li>
                <li><strong className="text-foreground">Droit de rectification :</strong> corriger vos données inexactes ou incomplètes</li>
                <li><strong className="text-foreground">Droit à l&apos;effacement :</strong> demander la suppression de vos données</li>
                <li><strong className="text-foreground">Droit à la limitation :</strong> limiter le traitement de vos données</li>
                <li><strong className="text-foreground">Droit à la portabilité :</strong> recevoir vos données dans un format structuré</li>
                <li><strong className="text-foreground">Droit d&apos;opposition :</strong> vous opposer au traitement de vos données</li>
                <li><strong className="text-foreground">Droit de retirer votre consentement :</strong> à tout moment</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Pour exercer vos droits, contactez-nous à : privacy@rankflow.ai
              </p>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed">
                Notre site utilise des cookies pour améliorer votre expérience. Vous pouvez gérer 
                vos préférences via notre bandeau de consentement. Pour plus d&apos;informations, 
                consultez notre politique cookies accessible depuis le bandeau.
              </p>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Sécurité</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous mettons en œuvre des mesures techniques et organisationnelles appropriées 
                pour protéger vos données contre tout accès non autorisé, modification, divulgation 
                ou destruction. Ces mesures incluent le chiffrement SSL/TLS, l&apos;authentification 
                à deux facteurs et des audits de sécurité réguliers.
              </p>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Transferts internationaux</h2>
              <p className="text-muted-foreground leading-relaxed">
                Certaines de vos données peuvent être transférées vers des pays situés hors de 
                l&apos;Union Européenne (notamment les États-Unis pour l&apos;hébergement). Ces 
                transferts sont encadrés par des garanties appropriées (clauses contractuelles types, 
                certifications) conformément au RGPD.
              </p>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">11. Réclamation</h2>
              <p className="text-muted-foreground leading-relaxed">
                Si vous estimez que le traitement de vos données ne respecte pas la réglementation, 
                vous pouvez introduire une réclamation auprès de la CNIL (Commission Nationale de 
                l&apos;Informatique et des Libertés) : www.cnil.fr
              </p>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">12. Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout 
                moment. Toute modification sera publiée sur cette page avec une date de mise à jour.
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
