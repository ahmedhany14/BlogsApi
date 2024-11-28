import express from "express"

class appRouter {
    private router: express.Router

    constructor() {
        this.router = express.Router()
    }

    public getInitialRoute() {
        return this.router;
    }
}

const router = new appRouter().getInitialRoute();
export const app = express();
app.use(express.json());
export default router;
