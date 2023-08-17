const request = require("supertest");
const server = require("./index");

describe("testing de turismo", () => {
 
    xit("GET", async () => {
        const { statusCode } = await request(server).get("/turismo").send();
        expect(statusCode).toBe(201);
    });

 
    it("POST", async () => {
        const id = Math.floor(Math.random() * 999);
        const lugar = { id, nombre: "Brasil" };

        const { body: lugares, statusCode} = await request(server)
            .post("/turismo")
            .send(lugar);

        expect(lugares).toContainEqual(lugar);
        expect(statusCode).toBe(201);
    });


    xit("DELETE", async () => {
        const idDeLugarAEliminar = "cualquier id"
        const { statusCode, message } = await request(server)
            .delete(`/turismo/${idDeLugarAEliminar}`)
            .send();
        expect(statusCode).toBe(404);
    });

    xit("DELETE", async () => {
        const idDeLugarAEliminar = 1
        const { statusCode } = await request(server)
            .delete(`/turismo/${idDeLugarAEliminar}`)
            .send();
        expect(statusCode).toBe(200);
    });




});
