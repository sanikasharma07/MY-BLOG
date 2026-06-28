const config = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    
    // 👇 All of these needed the "_APPWRITE_" part added to match your .env!
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteTableId: String(import.meta.env.VITE_APPWRITE_TABLE_ID),
    appwriteBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    tinymceApiKey:String(import.meta.env.VITE_TINYMCE_API_KEY)
}

export default config;