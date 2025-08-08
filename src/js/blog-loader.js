// blog-loader.js
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('article') || 'ia-energie-afrique'; // Article par défaut

    // Mapping entre les IDs et les titres d'article
    const articles = {
        "ia-energie-afrique": {
            title: "Intelligence Artificielle et Énergie : Le duo gagnant pour l'Afrique",
            file: "ia-energie-afrique.htm"
        },
        "dev-web-2025": {
            title: "Le futur du Développement Web en Afrique d’ici 2025",
            file: "dev-web-2025.htm"
        },
        "ia-generative-benin": {
            title: "Exploiter l'IA générative pour les entreprises locales au Bénin",
            file: "ia-generative-benin.htm"
        },
        "quantique-afrique": {
            title: "L'informatique quantique : Ce que cela signifie pour l'avenir tech de l'Afrique",
            file: "quantique-afrique.htm"
        },
        "tech-durable-afrique": {
            title: "Solutions tech durables : Études de cas en Afrique",
            file: "tech-durable-afrique.htm"
        },
        "genie-elec-ia": {
            title: "Du génie électrique à l'IA : Combiner les disciplines pour innover",
            file: "genie-elec-ia.htm"
        },
        "open-source-afrique": {
            title: "Le rôle du code open source dans les écosystèmes tech africains",
            file: "open-source-afrique.htm"
        },
        "ia-bien-social": {
            title: "L'IA pour le bien social : Projets transformant les communautés africaines",
            file: "ia-bien-social.htm"
        },
        "startup-benin": {
            title: "Naviguer dans le paysage des startups au Bénin : Conseils pour les entrepreneurs tech",
            file: "startup-benin.htm"
        },
        "anniversaire-parcours": {
            title: "Anniversaire spécial : Mon parcours, mes défis et mes ambitions dans la tech africaine",
            file: "anniversaire-parcours.htm"
        },
        "automatisation-travail-afrique": {
            title: "L'automatisation et l'avenir du travail en Afrique : Se préparer pour 2025 et au-delà",
            file: "automatisation-travail-afrique.htm"
        }
    };

    const article = articles[articleId];
    if (!article) {
        document.getElementById('article-content').innerHTML = "<p>Article non trouvé.</p>";
        return;
    }

    // Charger le contenu HTML de l'article
    fetch(`partials/components/articles/${article.file}`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('article-content').innerHTML = data;
            document.getElementById('breadcrumb-title').innerText = article.title;
        })
        .catch(error => {
            console.error('Erreur de chargement de l’article:', error);
            document.getElementById('article-content').innerHTML = "<p>Erreur de chargement.</p>";
        });

});
