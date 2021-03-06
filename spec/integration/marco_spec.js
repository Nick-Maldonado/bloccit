const request = require("request");
const server = require("../../src/server");
const base = "http://localhost:3000/marco";

describe("routes : marco", () => {
  describe("GET /marco", () => {
    it("should return status code 200", (done) => {
      request.get(base, (err, res, body) => {
        expect(res.statusCode).toBe(200);
        done();
      });
    });

    it("should have 'polo' as the body", (done) => {
      request.get(base, (err, res, body) => {
        expect(body).toContain("polo");
        done();
      });
    });

  });
});