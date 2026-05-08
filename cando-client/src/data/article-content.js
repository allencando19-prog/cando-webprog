import java from "../assets/java.jpeg";
import python from "../assets/python.jpg";
import reactjs from "../assets/reactjs.png";
import wordpress from "../assets/wordpress.avif";

const articles = [
  {
    name: "java",
    title: "Java",
    image: java,
    content: [
      "Java is a class-based, object-oriented programming language designed to have as few implementation dependencies as possible.",
      "It follows the 'Write Once, Run Anywhere' principle, meaning compiled Java code can run on all platforms that support Java.",
      "Key concepts include classes, objects, inheritance, encapsulation, and polymorphism.",
    ],
  },
  {
    name: "python",
    title: "Python",
    image: python,
    content: [
      "Python is a high-level, interpreted programming language known for its simplicity and readability.",
      "It supports multiple programming paradigms including procedural, object-oriented, and functional programming.",
      "Python is widely used in web development, data science, artificial intelligence, and automation.",
    ],
  },
  {
    name: "reactjs",
    title: "ReactJS",
    image: reactjs,
    content: [
      "React is a JavaScript library for building user interfaces, maintained by Meta and a community of developers.",
      "It uses a component-based architecture where UI is broken into reusable, independent pieces.",
      "React uses a virtual DOM to efficiently update and render components when data changes.",
    ],
  },
  {
    name: "wordpress",
    title: "WordPress",
    image: wordpress,
    content: [
      "WordPress is a free and open-source content management system written in PHP.",
      "It powers over 40% of all websites on the internet, making it the most popular CMS in the world.",
      "WordPress supports thousands of themes and plugins that allow users to customize their websites without coding.",
      "It can be used for blogs, portfolios, e-commerce stores, and full business websites.",
    ],
  },
  {
    name: "react-state-management",
    title: "Managing State in React",
    image: null,
    content: [
      "State allows components to keep track of dynamic data.",
      "useState hook lets functional components manage state.",
      "Example:\nconst [count, setCount] = useState(0);",
      "Updating state triggers a re-render with the new value.",
    ],
  },
];

export default articles;
