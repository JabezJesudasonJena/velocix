import { describe,  it, expect, test} from "vitest";
import app from "../../src/index.mjs"
import request from "supertest"

describe("Store", ()=> {
    const endPoint = "/api/store";
    const storeId = 1;
    it("Get all Stores", async() => {
        const res = await request(app).get(endPoint);
        expect(res.body).toBeDefined();
    })
    it("Get Specific store", async() => {
        const res = await request(app).get(`${endPoint}/${storeId}`);
        expect(res.status).toBe(200);
        expect(res.body).toBeDefined();
    })
})