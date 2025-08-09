// Liste des articles (id, titre, fichier, breadcrumb)
const articles = [
    {
        id: 'ia-energie-afrique',
        titre: "L'IA dans la gestion de l'énergie : Opportunités pour l'Afrique en 2025",
        breadcrumb: "IA & Energie Afrique",
        file: 'ia-energie-afrique.htm'
    },
    {
        id: 'dev-web-2025',
        titre: "Tendances du développement web 2025 : Ce que les développeurs africains doivent savoir",
        breadcrumb: "Dév. web 2025",
        file: 'dev-web-2025.htm'
    },
    {
        id: 'ia-generative-benin',
        titre: "Exploiter l'IA générative pour les entreprises locales au Bénin",
        breadcrumb: "IA générative Bénin",
        file: 'ia-generative-benin.htm'
    },
    {
        id: 'quantique-afrique',
        titre: "L'informatique quantique : Ce que cela signifie pour l'avenir tech de l'Afrique",
        breadcrumb: "Quantique & Afrique",
        file: 'quantique-afrique.htm'
    },
    {
        id: 'tech-durable-afrique',
        titre: "Solutions tech durables : Études de cas en Afrique",
        breadcrumb: "Tech durable Afrique",
        file: 'tech-durable-afrique.htm'
    },
    {
        id: 'genie-elec-ia',
        titre: "Du génie électrique à l'IA : Combiner les disciplines pour innover",
        breadcrumb: "Génie électrique & IA",
        file: 'genie-elec-ia.htm'
    },
    {
        id: 'open-source-afrique',
        titre: "Le rôle du code open source dans les écosystèmes tech africains",
        breadcrumb: "Open source Afrique",
        file: 'open-source-afrique.htm'
    },
    {
        id: 'ia-bien-social',
        titre: "L'IA pour le bien social : Projets transformant les communautés africaines",
        breadcrumb: "IA & Bien social",
        file: 'ia-bien-social.htm'
    },
    {
        id: 'startup-benin',
        titre: "Naviguer dans le paysage des startups au Bénin : Conseils pour les entrepreneurs tech",
        breadcrumb: "Startups Bénin",
        file: 'startup-benin.htm'
    },
    {
        id: 'anniversaire-parcours',
        titre: "Anniversaire spécial : Mon parcours, mes défis et mes ambitions dans la tech africaine",
        breadcrumb: "Anniversaire & Parcours",
        file: 'anniversaire-parcours.htm'
    },
    {
        id: 'automatisation-travail-afrique',
        titre: "L'automatisation et l'avenir du travail en Afrique : Se préparer pour 2025 et au-delà",
        breadcrumb: "Automatisation & Travail",
        file: 'automatisation-travail-afrique.htm'
    }
];

// Fonction pour obtenir l'id d'article depuis l'URL (?article=...)
function getArticleIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('article') || articles[0].id;
}

// Fonction pour charger dynamiquement le breadcrumb
function loadBreadcrumb() {
    const articleId = getArticleIdFromUrl();
    const article = articles.find(a => a.id === articleId) || articles[0];
    document.getElementById('breadcrumb-container').innerHTML = `
    <header class="breadCrumb">
      <div class="container">
        <div class="row">
          <div class="col-lg-10 col-md-12 offset-lg-1 offset-md-0 text-center">
            <h3 class="breadCrumb__title">${article.titre}</h3>
            <nav aria-label="breadcrumb" class="d-flex justify-content-center">
              <ol class="breadcrumb align-items-center">
                <li class="breadcrumb-item"><a href="index.html">Accueil</a></li>
                <li class="breadcrumb-item"><a href="blog.html">Tous les articles</a></li>
                <li class="breadcrumb-item active" aria-current="page">${article.breadcrumb}</li>
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </header>
    `;
}

function loadPageTitle() {
    // Exemple : récupération d'un paramètre de catégorie dans l'URL
    const params = new URLSearchParams(window.location.search);
    const categorie = params.get('categorie');
    let title = "Articles récents";
    let breadcrumb = "Tous les articles";
    if (categorie) {
        title = "Articles de la catégorie : " + categorie;
        breadcrumb = categorie;
    }
    document.getElementById('page-title-container').innerHTML = `
        <section class="page-title">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12">
                        <h1>${title}</h1>
                        <ul class="breadcrumb__list">
                            <li><a href="index.html">Accueil</a></li>
                            <li>${breadcrumb}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    `;
}

window.addEventListener('DOMContentLoaded', loadBreadcrumb);
window.addEventListener('DOMContentLoaded', loadPageTitle);

