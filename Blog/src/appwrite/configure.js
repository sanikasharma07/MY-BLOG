import config from "../conf/config";
import { Client, TablesDB, ID, Storage, Query } from "appwrite";

export class Service {
    client = new Client();
    // Keeping your variables exactly as they should be!
    tablesdb;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
            
        this.tablesdb = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            // FIXED TYPO: Changed this.tablesDB to this.tablesdb (case-sensitive!)
            return await this.tablesdb.createRow(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    
                }
            );
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error);
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            // FIXED TYPO: tablesDB -> tablesdb AND congif -> config
            return await this.tablesdb.updateRow(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (error) {
            console.log("Appwrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            // FIXED TYPO: tablesDB -> tablesdb
            await this.tablesdb.deleteRow(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                slug
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.tablesdb.getRow(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                slug
            );
        } catch (error) {
            console.log("Appwrite service :: getPost :: error", error);
        }
    }

    // FIXED TYPO: Added quotes around 'active' so JavaScript knows it's a string!
    async allPost(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.tablesdb.listRows(
                config.appwriteDatabaseId,
                config.appwriteTableId,
                queries
            );
        } catch (error) {
            console.log("Appwrite service :: allPost :: error", error);
            return false;
        }
    }

    // file upload
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appwriteBucketId,
                // FIXED TYPO: Added parentheses () because unique is a function!
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite service :: uploadFile :: error", error);
        }
    }

    async deleteFile(fileID) {
        try {
            await this.bucket.deleteFile(
                config.appwriteBucketId,
                fileID
            );
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileID) {
        return this.bucket.getFilePreview(
            config.appwriteBucketId,
            fileID
        );
    }
}

const service = new Service();
export default service;