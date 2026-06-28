import config from "../conf/config";
import { Client, Account, ID } from "appwrite"

export class Authservice {
    client = new Client();
    account;
    
    constructor() {
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        }
        catch (error) {
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        }
        catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        }
        catch (error) {
            // FIXED: Silently log the error instead of crashing the app!
            console.log("Appwrite service :: getCurrentUser :: error", error);
        }
        
        // If the try block fails, it will gracefully fall down here and return null
        return null;
    }

    async logout() {
        try {
            return await this.account.deleteSession('current');
        }
        catch (error) {
            console.log("Appwrite service :: logout :: error", error);
        }
    }
}

const authService = new Authservice();

export default authService;