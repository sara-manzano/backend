require("dotenv").config();
const mongoose = require("mongoose");
const Movie = require("../models/movies");

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado a MongoDB");

    await Movie.collection.drop().catch(() => null);

    const data = [
      {
        plot: "Cartoon figures announce, via comic strip balloons, that they will move - and move they do, in a wildly exaggerated style.",
        genres: ["Animation", "Short", "Comedy"],
        runtime: 7,
        cast: ["Winsor McCay"],
        num_mflix_comments: 0,
        poster: "https://m.media-amazon.com/images/M/MV5BYzg2NjNhNTctMjUxMi00ZWU4LWI3ZjYtNTI0NTQxNThjZTk2XkEyXkFqcGdeQXVyNzg5OTk2OA@@._V1_SY1000_SX677_AL_.jpg",
        title: "Winsor McCay, the Famous Cartoonist of the N.Y. Herald and His Moving Comics",
        fullplot: "Cartoonist Winsor McCay agrees to create a large set of drawings that will be photographed and made into a motion picture. The job requires plenty of drawing supplies, and the cartoonist must also overcome some mishaps caused by an assistant. Finally, the work is done, and everyone can see the resulting animated picture.",
        languages: ["English"],
        released: new Date(-1853539200000),
        directors: ["Winsor McCay", "J. Stuart Blackton"],
        writers: [
          'Winsor McCay (comic strip "Little Nemo in Slumberland")',
          "Winsor McCay (screenplay)",
        ],
        awards: { wins: 1, nominations: 0, text: "1 win." },
        lastupdated: "2015-08-29 01:09:03.030000000",
        year: 1911,
        imdb: { rating: 7.3, votes: 1034, id: 1737 },
        countries: ["USA"],
        type: "movie",
        tomatoes: {
          viewer: { rating: 3.4, numReviews: 89, meter: 47 },
          lastUpdated: new Date("2015-08-20T18:51:24.000Z"),
        },
      },
      {
        plot: "A con artist masquerades a Russian nobility and attempts to seduce the wife of an American diplomat.",
        genres: ["Drama"],
        runtime: 117,
        cast: ["Erich von Stroheim", "Miss DuPont", "Mae Busch", "Cesare Gravina"],
        num_mflix_comments: 0,
        poster: "https://m.media-amazon.com/images/M/MV5BMTk2NDkxMTY1Nl5BMl5BanBnXkFtZTcwOTM0MjEzNA@@._V1_SY1000_SX677_AL_.jpg",
        title: "Foolish Wives",
        fullplot: '"Count" Karanzim, a Don Juan is with his cousins in Monte Carlo, living on the edge of society and swindling rich American women.',
        languages: ["English"],
        released: new Date("1922-01-11T00:00:00.000Z"),
        directors: ["Erich von Stroheim"],
        writers: ["Erich von Stroheim", "Marian Ainslee", "Walter Anthony"],
        awards: { wins: 1, nominations: 0, text: "1 win." },
        lastupdated: "2015-09-05 00:00:37.817000000",
        year: 1922,
        imdb: { rating: 7.2, votes: 3500, id: 13341 },
        countries: ["USA"],
        type: "movie",
        tomatoes: {
          viewer: { rating: 3.2, numReviews: 120, meter: 60 },
          lastUpdated: new Date("2015-09-05T00:00:00.000Z"),
        },
      },
      {
        plot: "Salome, the daughter of Herodias, seduces her step-father/uncle Herod, the Governor of Judea.",
        genres: ["Drama", "History", "Romance"],
        runtime: 72,
        cast: ["Alla Nazimova", "Mitchell Lewis", "Rose Dione", "Earl Schenck"],
        num_mflix_comments: 0,
        poster: "https://m.media-amazon.com/images/M/MV5BMjA0MTY4MzI2OV5BMl5BanBnXkFtZTcwOTM0MjEzNA@@._V1_SY1000_SX677_AL_.jpg",
        title: "Salomè",
        fullplot: "Salome, the daughter of Herodias, seduces her step-father/uncle Herod, the Governor of Judea, into granting her any wish.",
        countries: ["USA"],
        released: new Date("1923-02-15T00:00:00.000Z"),
        directors: ["Charles Bryant", "Alla Nazimova"],
        writers: ["Alla Nazimova", "Oscar Wilde"],
        awards: { wins: 0, nominations: 1, text: "1 nomination." },
        lastupdated: "2015-04-26 00:03:19.913000000",
        year: 1922,
        imdb: { rating: 6.5, votes: 1200, id: 14454 },
        type: "movie",
        tomatoes: {
          viewer: { rating: 3.0, numReviews: 80, meter: 50 },
          lastUpdated: new Date("2015-04-26T00:00:00.000Z"),
        },
      },
      {
        plot: "A greedy tycoon decides, on a whim, to corner the world market in wheat.",
        genres: ["Drama", "Short"],
        runtime: 14,
        cast: ["Frank Powell", "Grace Henderson", "James Kirkwood", "Linda Arvidson"],
        num_mflix_comments: 1,
        title: "A Corner in Wheat",
        fullplot: "A greedy tycoon decides, on a whim, to corner the world market in wheat. In doing so, he forces the price of bread up until the poor can't afford to buy it.",
        languages: ["English"],
        released: new Date("1909-12-13T00:00:00.000Z"),
        directors: ["D.W. Griffith"],
        rated: "G",
        awards: { wins: 1, nominations: 0, text: "1 win." },
        lastupdated: "2015-08-13 00:46:30.660000000",
        year: 1909,
        imdb: { rating: 6.6, votes: 1300, id: 513 },
        countries: ["USA"],
        type: "movie",
        tomatoes: {
          viewer: { rating: 3.5, numReviews: 109, meter: 73 },
          lastUpdated: new Date("2015-08-13T00:00:00.000Z"),
        },
      },
      {
        plot: "Gwen's family is rich, but her parents ignore her and most of the servants neglect her.",
        genres: ["Drama", "Fantasy", "Romance"],
        runtime: 65,
        cast: ["Mary Pickford", "Madlaine Traverse", "Charles Wellesley", "Gladys Fairbanks"],
        num_mflix_comments: 0,
        title: "The Poor Little Rich Girl",
        fullplot: "Gwen's family is rich, but her parents ignore her and most of the servants neglect her. She befriends the plumber's helper and dreams of a magical land.",
        languages: ["English"],
        released: new Date("1917-03-05T00:00:00.000Z"),
        directors: ["Maurice Tourneur"],
        writers: ["Eleanor Gates", "Frances Marion"],
        awards: { wins: 0, nominations: 1, text: "1 nomination." },
        lastupdated: "2015-07-27 00:11:31.387000000",
        year: 1917,
        imdb: { rating: 6.6, votes: 600, id: 8443 },
        countries: ["USA"],
        type: "movie",
        tomatoes: {
          viewer: { rating: 3.2, numReviews: 45, meter: 55 },
          lastUpdated: new Date("2015-07-27T00:00:00.000Z"),
        },
      },
      {
        plot: "Two peasant children, Mytyl and Tyltyl, are led by Berylune, a fairy, on a journey to find the bluebird of happiness.",
        genres: ["Fantasy"],
        runtime: 75,
        cast: ["Robin MacDougall", "Tula Belle", "Edwin E. Reed", "Emma Lowry"],
        num_mflix_comments: 0,
        poster: "https://m.media-amazon.com/images/M/MV5BMjNlMThmNzItMTZlMS00YzJkLTk1MzctZmE0NmVlMjU1ZWI0XkEyXkFqcGdeQXVyNjUwNzk3NDc@@._V1_SY1000_SX677_AL_.jpg",
        title: "The Blue Bird",
        fullplot: "Two peasant children, Mytyl and Tyltyl, are led by Berylune, a fairy, on a journey to find the bluebird of happiness.",
        languages: ["English"],
        released: new Date("1918-03-31T00:00:00.000Z"),
        directors: ["Maurice Tourneur"],
        writers: ["Maurice Maeterlinck", "Charles Maigne"],
        awards: { wins: 0, nominations: 1, text: "1 nomination." },
        lastupdated: "2015-07-20 00:32:04.810000000",
        year: 1918,
        imdb: { rating: 6.4, votes: 500, id: 8673 },
        countries: ["USA"],
        type: "movie",
        tomatoes: {
          viewer: { rating: 3.1, numReviews: 38, meter: 48 },
          lastUpdated: new Date("2015-07-20T00:00:00.000Z"),
        },
      },
      {
        plot: "The simple-minded son of a rich financier must find his own way in the world.",
        genres: ["Comedy"],
        runtime: 77,
        cast: ["Buster Keaton", "William H. Crane", "Irving Cummings", "Carol Holloway"],
        num_mflix_comments: 0,
        poster: "https://m.media-amazon.com/images/M/MV5BZDNiODA3NzQtNTBmZS00NTM3LWJlOGItYWIwZmE1ZTY5ZmE2XkEyXkFqcGdeQXVyNjUwNzk3NDc@@._V1_SY1000_SX677_AL_.jpg",
        title: "The Saphead",
        fullplot: "Nick Van Alstyne owns the Henrietta silver mine and is very rich. His son Bertie is simple-minded but good-natured, and must prove himself.",
        countries: ["USA"],
        released: new Date("1920-09-01T00:00:00.000Z"),
        directors: ["Herbert Blaché", "Winchell Smith"],
        writers: ["June Mathis", "Bronson Howard", "Winchell Smith", "Victor Mapes"],
        awards: { wins: 0, nominations: 1, text: "1 nomination." },
        lastupdated: "2015-06-20 00:38:08.303000000",
        year: 1920,
        imdb: { rating: 6.7, votes: 2100, id: 11622 },
        type: "movie",
        tomatoes: {
          viewer: { rating: 3.3, numReviews: 95, meter: 62 },
          lastUpdated: new Date("2015-06-20T00:00:00.000Z"),
        },
      },
    ];

    await Movie.insertMany(data);
    console.log("12 películas insertadas correctamente");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error en el seed:", error.message);
    process.exit(1);
  }
};

seed();
