import express from "express";
import {  deleteUser, signgin,   signup,  singOut, updateUser } from "../controllers/auth.controller.js";
import { getUserFinancialSummary } from "../controllers/total.controller.js";
import { getBudgetByUserAndMonth, getExpenseByUserAndMonth, getIncomeByUserAndMon } from "../controllers/boat.controller.js";
import { adeleteUser, asigngin, asignup, getAlluser } from "../controllers/admin.controller.js";



const route = express.Router();

route.post("/signup", signup);
route.post("/signin", signgin);
route.put("/update/:userId", updateUser);
route.delete("/delete/:userId", deleteUser);
route.post("/signout", singOut);
route.get('/user/:userId/financial-summary', getUserFinancialSummary);

route.get("/budget/:userId/:month", getBudgetByUserAndMonth);
route.get("/income/:userId/:month", getIncomeByUserAndMon);
route.get("/expense/:userId/:month", getExpenseByUserAndMonth);


route.post("/asignup", asignup);
route.post("/asignin", asigngin);

route.get("/getuser", getAlluser);
route.delete("/adelete/:auserId", adeleteUser);





export default route;
