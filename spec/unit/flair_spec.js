const sequelize = require("../../src/db/models/index").sequelize;
const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const Flair = require("../../src/db/models").Flair

describe("Flair", () => {

  beforeEach((done) => {
    this.topic;
    this.post;

    sequelize.sync({force: true}).then((res) => {
      Topic.create({
        title: "Expeditions to Alpha Centauri",
        description: "A compilation of reports from recent visits to the star system."
      })
      .then((topic) => {
        this.topic = topic;
        Post.create({
          title: "My first visit to Proxima Centauri b",
          body: "I saw some rocks.",
          topicId: this.topic.id
        })
        .then((post) => {
          this.post = post;
          done();
        });
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    });

  });

  describe("#addFlair()", () => {

    it("should create a flair with name and color attributes that is associated with a post", (done) => {
      Flair.addFlair({
        name: "The Golden Post",
        color: "gold",
        postId: this.post.id
      })
      .then((flair) => {
        expect(flair.name).toBe("The Golden Post");
        expect(flair.color).toBe("gold");
        expect(flair.postId).toBe(this.post.id);
        done();
      })
      .catch((err) => {
        console.log(err);
        done();
      });
    })
  });

});