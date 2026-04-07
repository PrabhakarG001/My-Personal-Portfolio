import { useEffect, useState } from "react";
import "./Typewriter.css";

const Typewriter = ({
  words = ["Hi, I'm Prabhakar Gupta","Full-Stack Developer", "Aspiring Software Engineer", "Comptative Programming Enthusiast"],
  typingSpeed = 100,
  deletingSpeed = 60,
  delay = 1500,
}) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex % words.length];

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setText(currentWord.substring(0, text.length - 1));
      } else {
        setText(currentWord.substring(0, text.length + 1));
      }

      if (!isDeleting && text === currentWord) {
        setTimeout(() => setIsDeleting(true), delay);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setWordIndex((prev) => prev + 1);
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, delay]);

  return (
    <div className="typewriter-wrapper">
      <span className="gradient-typewriter">
        {text}
        <span className="blinking-cursor">|</span>
      </span>
    </div>
  );
};

export default Typewriter;