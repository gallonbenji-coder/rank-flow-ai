"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CGV() {
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

          <h1 className="text-4xl font-bold text-foreground mb-8">Conditions Générales de Vente</h1>

          <div className="prose prose-invert max-w-none space-y-8">
            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 1 - Objet</h2>
              <p className="text-muted-foreground leading-relaxed">
                Les présentes Conditions Générales de Vente (CGV) régissent les relations contractuelles 
                entre RankFlow SAS (ci-après « RankFlow ») et tout client professionnel (ci-après « le Client ») 
                souscrivant aux services proposés sur le site rankflow.ai.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Toute souscription à nos services implique l&apos;acceptation sans réserve des présentes CGV.
              </p>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 2 - Services</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                RankFlow propose une plateforme SaaS d&apos;optimisation SEO et de visibilité sur les moteurs 
                de recherche IA. Les services comprennent selon la formule choisie :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Analyse et suivi de positionnement SEO</li>
                <li>Optimisation pour les moteurs de recherche IA (ChatGPT, Perplexity, etc.)</li>
                <li>Recommandations de contenu automatisées</li>
                <li>Tableaux de bord et rapports analytiques</li>
                <li>Support client selon le niveau de service</li>
                <li>Accès API (selon formule)</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 3 - Tarifs et paiement</h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">3.1 Tarifs</strong><br />
                Les prix sont indiqués en euros hors taxes (HT). La TVA applicable sera ajoutée selon 
                la législation en vigueur. Les tarifs sont ceux en vigueur au moment de la souscription.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong className="text-foreground">3.2 Modalités de paiement</strong><br />
                Le paiement s&apos;effectue par carte bancaire via notre prestataire sécurisé Stripe. 
                L&apos;abonnement est facturé mensuellement ou annuellement selon l&apos;option choisie, 
                avec prélèvement automatique.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong className="text-foreground">3.3 Retard de paiement</strong><br />
                Tout retard de paiement entraînera l&apos;application de pénalités de retard au taux 
                de 3 fois le taux d&apos;intérêt légal, ainsi qu&apos;une indemnité forfaitaire de 40€ 
                pour frais de recouvrement.
              </p>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 4 - Durée et résiliation</h2>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">4.1 Durée</strong><br />
                L&apos;abonnement est souscrit pour une durée d&apos;un mois (abonnement mensuel) ou 
                d&apos;un an (abonnement annuel), renouvelable tacitement.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong className="text-foreground">4.2 Résiliation par le Client</strong><br />
                Le Client peut résilier son abonnement à tout moment depuis son espace client. 
                La résiliation prend effet à la fin de la période en cours. Aucun remboursement 
                prorata temporis ne sera effectué.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                <strong className="text-foreground">4.3 Résiliation par RankFlow</strong><br />
                RankFlow se réserve le droit de résilier l&apos;abonnement en cas de manquement 
                du Client à ses obligations, notamment en cas de non-paiement ou d&apos;utilisation 
                abusive des services.
              </p>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 5 - Droit de rétractation</h2>
              <p className="text-muted-foreground leading-relaxed">
                Conformément à l&apos;article L221-28 du Code de la consommation, le droit de 
                rétractation ne s&apos;applique pas aux services pleinement exécutés avant la fin 
                du délai de rétractation et dont l&apos;exécution a commencé avec l&apos;accord 
                préalable et exprès du Client.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Toutefois, RankFlow offre une garantie satisfait ou remboursé de 14 jours à 
                compter de la première souscription.
              </p>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 6 - Obligations du Client</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Le Client s&apos;engage à :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Fournir des informations exactes lors de l&apos;inscription</li>
                <li>Utiliser les services conformément à leur destination</li>
                <li>Ne pas revendre ou partager son accès à des tiers</li>
                <li>Ne pas utiliser les services à des fins illégales ou contraires aux bonnes mœurs</li>
                <li>Respecter les limites d&apos;utilisation de sa formule</li>
                <li>Maintenir la confidentialité de ses identifiants de connexion</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 7 - Obligations de RankFlow</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                RankFlow s&apos;engage à :
              </p>
              <ul className="list-disc list-inside text-muted-foreground space-y-2">
                <li>Fournir les services conformément à la description de la formule souscrite</li>
                <li>Assurer une disponibilité des services de 99,9% (hors maintenance programmée)</li>
                <li>Informer le Client de toute maintenance programmée au moins 48h à l&apos;avance</li>
                <li>Assurer la sécurité et la confidentialité des données du Client</li>
                <li>Fournir un support client selon le niveau de service de la formule</li>
              </ul>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 8 - Limitation de responsabilité</h2>
              <p className="text-muted-foreground leading-relaxed">
                RankFlow fournit ses services « en l&apos;état ». La responsabilité de RankFlow ne 
                pourra être engagée qu&apos;en cas de faute prouvée et sera limitée aux dommages 
                directs, à l&apos;exclusion de tout dommage indirect.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                En tout état de cause, la responsabilité de RankFlow est limitée au montant des 
                sommes versées par le Client au cours des 12 derniers mois.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                RankFlow ne garantit pas de résultats spécifiques en termes de référencement, 
                les performances dépendant de nombreux facteurs extérieurs.
              </p>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 9 - Propriété intellectuelle</h2>
              <p className="text-muted-foreground leading-relaxed">
                RankFlow reste propriétaire de l&apos;ensemble des droits de propriété intellectuelle 
                relatifs à la plateforme et aux services. Le Client bénéficie d&apos;un droit 
                d&apos;utilisation non exclusif et non transférable pendant la durée de son abonnement.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Le Client reste propriétaire de ses données et contenus. Il accorde à RankFlow 
                une licence limitée pour traiter ces données dans le cadre de la fourniture des services.
              </p>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 10 - Protection des données</h2>
              <p className="text-muted-foreground leading-relaxed">
                Le traitement des données personnelles est régi par notre Politique de Confidentialité, 
                accessible sur notre site. RankFlow s&apos;engage à respecter le RGPD et la loi 
                Informatique et Libertés.
              </p>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 11 - Modification des CGV</h2>
              <p className="text-muted-foreground leading-relaxed">
                RankFlow se réserve le droit de modifier les présentes CGV. Le Client sera informé 
                de toute modification par email au moins 30 jours avant leur entrée en vigueur. 
                En cas de désaccord, le Client pourra résilier son abonnement.
              </p>
            </section>

            <section className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Article 12 - Droit applicable et litiges</h2>
              <p className="text-muted-foreground leading-relaxed">
                Les présentes CGV sont soumises au droit français. En cas de litige, les parties 
                s&apos;efforceront de trouver une solution amiable. À défaut, les tribunaux de 
                Paris seront seuls compétents.
              </p>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Conformément aux dispositions du Code de la consommation concernant le règlement 
                amiable des litiges, le Client peut recourir au service de médiation proposé par 
                RankFlow. Le médiateur peut être saisi via [coordonnées du médiateur à compléter].
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
