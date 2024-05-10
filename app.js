
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "Welcome to DailyScribe, your digital haven for daily reflections and musings. We are thrilled to provide you with a nurturing space where you can unleash your thoughts and chronicle the essence of your everyday experiences. Whether you're seeking solace in introspection or looking to share your anecdotes with a like-minded community, DailyScribe is your trusted companion. Let the ink of your thoughts flow freely as you embark on this profound journey of self-discovery and storytelling. Embrace the power of words and the art of storytelling, for within these pages, your narratives find a home. Join us in this pursuit of capturing life's fleeting moments and weaving them into a tapestry of memories that will be cherished for a lifetime.";
const aboutContent = "At DailyScribe, we believe in the transformative power of self-expression and storytelling. Our platform is dedicated to fostering a vibrant community of individuals passionate about preserving their daily narratives and reflections. Whether you're an avid writer, an aspiring wordsmith, or simply someone looking to capture life's fleeting moments, we provide a welcoming digital space for you to embark on this enriching journey. With a deep appreciation for the written word and its ability to transcend time, we aim to encourage introspection, self-discovery, and the celebration of life's everyday adventures. Join us in this pursuit as we weave together a tapestry of diverse stories and experiences, creating a collective legacy that resonates with the beauty of the human experience.";
const contactContent = "We value your feedback and are committed to providing exceptional support to our community. Whether you have a question, suggestion, or simply want to share your thoughts, we encourage you to reach out to us. Our dedicated team at DailyScribe is here to assist you in any way we can. Feel free to drop us a line using the form below or reach out to us directly via the provided email address. Your input is invaluable to us, and we look forward to hearing from you and building a stronger, more engaging platform together.";
const aboutContent2 = "Driven by a passion for creativity and the written word, DailyScribe is committed to fostering a supportive and inclusive environment for individuals from all walks of life. We believe that every voice deserves to be heard, and every story has the power to inspire and resonate with others. Our mission is to empower our community to embrace the therapeutic benefits of journaling and the profound impact of sharing personal narratives. With a deep-rooted belief in the cathartic nature of writing, we strive to cultivate a space where authenticity is celebrated, connections are forged, and personal growth is nurtured.";
const aboutContent3 = "Through a seamless blend of technology and heartfelt storytelling, DailyScribe endeavors to bridge the gap between digital innovation and the timeless art of journaling. We are dedicated to providing an intuitive and user-friendly platform that encourages seamless navigation and effortless sharing of your cherished moments. With a commitment to data security and privacy, we ensure that your personal stories remain safeguarded within our platform, allowing you to express yourself freely and authentically without any reservations. Join us as we continue to evolve and innovate, making the process of journaling a fulfilling and enriching experience for all.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


let posts = [
  {
    title: "Mindfulness in the Digital Age",
    content: "In the digital age, where screens vie for our attention, mindfulness has become a crucial tool for reclaiming mental clarity. It's about intentionally directing our focus to the present moment, amidst the constant buzz of notifications and distractions. Mindfulness offers a sanctuary from the digital deluge, allowing us to cultivate awareness of our thoughts, feelings, and surroundings. By practicing mindfulness, we can find refuge from the digital noise and nurture a deeper connection with ourselves and the world around us. It's a timeless practice that's more relevant than ever in our fast-paced, technology-driven society."
  },
  {
    title: "The Future of Renewable Energy",
    content: "The future of renewable energy is bright, promising a sustainable and cleaner world. Innovations in solar, wind, hydro, and other renewable technologies are rapidly advancing, making them more efficient and affordable. With increasing awareness of climate change and environmental concerns, there's growing momentum to transition away from fossil fuels towards renewable sources. Government policies and investments are driving this shift, fostering a conducive environment for renewable energy adoption. As we embrace these technologies, we pave the way for a greener future, reducing carbon emissions and mitigating the impacts of climate change."
  },
];


app.get("/", function(req, res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/about", function(req, res){
  res.render("about", {
    aboutContent: aboutContent,
    aboutContent2: aboutContent2,
    aboutContent3: aboutContent3
  });
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);

  res.redirect("/");

});

app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
