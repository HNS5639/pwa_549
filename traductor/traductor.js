const fs = require('fs');
const { translate } = require('@vitalets/google-translate-api');

const delay = (ms) => new Promise(res => setTimeout(res, ms));

async function traducirRecetas() {
    try {
        const rawData = fs.readFileSync('recetas_reales.json', 'utf8');
        let recetas = JSON.parse(rawData);

        console.log(`Iniciando traducción de ${recetas.length} recetas...`);

        for (let i = 0; i < recetas.length; i++) {
            const receta = recetas[i];
            
            // Si ya tiene título en español (y no dice "Falta traducir"), nos la saltamos
            if (receta.content.es.title && !receta.content.es.title.includes("(Falta traducir)")) {
                console.log(`[${i + 1}/${recetas.length}] Saltando (ya traducida): ${receta.content.es.title}`);
                continue;
            }

            const en = receta.content.en;
            const es = receta.content.es;

            console.log(`[${i + 1}/${recetas.length}] Traduciendo: ${en.title}`);

            // 1. Traducir Título y Descripción
            const resTitle = await translate(en.title, { from: 'en', to: 'es' });
            es.title = resTitle.text;
            await delay(1000); // Pausa de 1 seg

            const resDesc = await translate(en.description, { from: 'en', to: 'es' });
            es.description = resDesc.text;
            await delay(1000);

            // 2. Traducir Ingredientes (Todos juntos separados por " || ")
            if (en.ingredients.length > 0) {
                const textIng = en.ingredients.join(" || ");
                const resIng = await translate(textIng, { from: 'en', to: 'es' });
                es.ingredients = resIng.text.split(" || ");
                await delay(1000);
            }

            // 3. Traducir Instrucciones (Todas juntas)
            if (en.instructions.length > 0) {
                const textInst = en.instructions.join(" || ");
                const resInst = await translate(textInst, { from: 'en', to: 'es' });
                es.instructions = resInst.text.split(" || ");
                await delay(1000);
            }

            // Guardar progreso cada 5 recetas por si se corta
            if (i % 5 === 0) {
                fs.writeFileSync('recetas_reales.json', JSON.stringify(recetas, null, 2));
            }
        }

        fs.writeFileSync('recetas_reales.json', JSON.stringify(recetas, null, 2));
        console.log('¡Finalizado con éxito!');

    } catch (error) {
        console.error('Error detectado:', error.message);
        console.log('Espera unos 15 minutos antes de volver a intentar.');
    }
}

traducirRecetas();