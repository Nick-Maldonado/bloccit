const Topic = require("../../src/db/models").Topic;
const Post = require("../../src/db/models").Post;
const sequelize = require("../../src/db/models/index").sequelize;

describe("Topic", () => {

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

  describe("#create()", () => {

    it("should create a topoic object and store it in the database", (done) => {
      Topic.create({
        title: "Topic.create() unit test title",
        description: "A description for the Topic.create() unit test."
      })
      .then((topic) => {
        expect(topic.title).toBe("Topic.create() unit test title");
        expect(topic.description).toBe("A description for the Topic.create() unit test.");
        done();
      })
    });

    it("should not create a topic that is missing a description", (done) => {
      Topic.create({
        title: "Test Title"
      })
      .then((topic) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Topic.description cannot be null");
        done();
      })
    });

    it("should not create a topic that is missing a title", (done) => {
      Topic.create({
        description: "This is a test description."
      })
      .then((topic) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Topic.title cannot be null");
        done();
      })
    });

  });

  describe("#getPosts()", () => {

    it("should return an array of Post objects associated with the topic the method was called on", () => {
      this.topic.getPosts()
      .then((posts) => {
        expect(posts.length).toBe(1); // confirming one post added to array
        expect(Array.isArray(posts)).toBe(true); // confirming array structure
        expect(typeof posts[0].dataValues).toBe('object'); // confirming post is stored as an object inside of the array
        expect(posts[0].dataValues.topicId).toBe(this.topic.id);  //confirming post is associated with the right topic
      })     
    });

  });

});