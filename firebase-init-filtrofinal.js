
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAlJFnW9_R64HfhaI8gtbIu3fcZL7pew6g",
    authDomain: "sistemadevisorias.firebaseapp.com",
    projectId: "sistemadevisorias",
    storageBucket: "sistemadevisorias.firebasestorage.app",
    messagingSenderId: "583160022606",
    appId: "1:583160022606:web:e5a42639f31332b346251f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

console.log("🔥 Firebase inicializado correctamente para Filtro Final");

// Expose function to window object so it can be used by non-module scripts
window.guardarRegistroFiltroFinalFirebase = async function (registro) {
    try {
        console.log("🔥 Intentando guardar registro de Filtro Final en Firebase...", registro.folio);

        // IMPORTANTE: Siempre excluimos la foto y captura de anticipo para evitar el límite de 1MB de Firestore
        // Las imágenes se mantienen en el PDF pero no se guardan en la base de datos
        const { foto, capturaAnticipo, ...dataSinImagenes } = registro;

        // Create a copy to modify without the images
        const dataToSave = {
            ...dataSinImagenes,
            tipoRegistro: "filtro_final_nacional",
            fotoGuardada: false, // Indicar que la foto no está en la base de datos
            capturaAnticipoGuardada: false, // Indicar que la captura no está en la base de datos
            timestamp_creacion: serverTimestamp()
        };

        const docRef = await addDoc(collection(db, "registro_filtro_final"), dataToSave);
        console.log("✅ Documento de Filtro Final escrito en Firebase con ID: ", docRef.id);
        return docRef.id;
    } catch (e) {
        console.error("❌ Error añadiendo documento de Filtro Final a Firebase: ", e);
        throw e;
    }
};
