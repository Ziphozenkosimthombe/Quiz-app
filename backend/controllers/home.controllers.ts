import express from "express";

export class HomeController{
    static async getHome(req: express.Request, res: express.Response){
        try{
            res.render('index');
            res.status(200);
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
}