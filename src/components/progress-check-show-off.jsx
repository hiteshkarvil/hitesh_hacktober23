import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Badge,
  Text,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { BsSend } from "react-icons/bs";
import ReactMarkdown from "react-markdown";
import { Prism } from "react-syntax-highlighter";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import { useClipboard } from "@chakra-ui/react";

function Chapter() {
  const [showQuestions, setShowQuestions] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const toast = useToast();

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      toast({
        description: "Correct!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        description: "Incorrect!",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const mockQuestions = [
    {
      _id: "123",
      question:
        "Which of the following options correctly identifies the use of `var`, `let`, and `const` in JavaScript variable declaration?",
      options: [
        {
          _id: "1",
          text: "var allows reassignment and redeclaration, let allows reassignment but not redeclaration, const does not allow reassignment or redeclaration",
          isCorrect: false,
        },
        {
          _id: "2",
          text: "var does not allow reassignment or redeclaration, let allows reassignment and redeclaration, const allows reassignment but not redeclaration",
          isCorrect: false,
        },
        {
          _id: "3",
          text: "var allows reassignment but not redeclaration, let allows reassignment and redeclaration, const does not allow reassignment but allows redeclaration",
          isCorrect: true,
        },
        {
          _id: "4",
          text: "var allows reassignment but not redeclaration, let does not allow reassignment or redeclaration, const allows reassignment and redeclaration",
          isCorrect: false,
        },
      ],
    },
  ];

  return (
    <Box>
      <Button onClick={() => setShowQuestions(true)}>
        Intro to Javascript Questions
      </Button>
      <Modal isOpen={showQuestions} onClose={() => setShowQuestions(false)}>
        <ModalOverlay />
        <ModalContent mx="2rem" bg="fourth" color="black" bg="white">
          <ModalHeader pb="0" color="primary">
            Intro to Javascript Questions
          </ModalHeader>
          <ModalBody>
            {mockQuestions.map((question, questionIndex) => (
              <div key={question._id}>
                <Box fontSize="lg" className="chapter-content">
                  <Badge colorScheme="blue">{`Problem #${
                    questionIndex + 1
                  }`}</Badge>
                  <ReactMarkdown
                    children={question.question}
                    components={{
                      code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || "");
                        const textToCopy = String(children).replace(/\n$/, "");
                        const { hasCopied, onCopy } = useClipboard(textToCopy);

                        return !inline && match ? (
                          <Box position="relative">
                            <Prism
                              {...props}
                              children={textToCopy}
                              language={match[1]}
                              PreTag="div"
                            />
                            <Box position="absolute" top="5px" right="6px">
                              <IconButton
                                border="none"
                                background="none"
                                color="whiteAlpha.900"
                                onClick={onCopy}
                                aria-label="Copy to clipboard"
                                icon={
                                  hasCopied ? (
                                    <CheckIcon color="rgb(67, 155, 255)" />
                                  ) : (
                                    <CopyIcon />
                                  )
                                }
                              />
                            </Box>
                          </Box>
                        ) : (
                          <code className={className}>{children}</code>
                        );
                      },
                    }}
                  />
                </Box>
                <Text
                  mb="10px"
                  fontSize="sm"
                  p="0"
                  color="tertiary"
                  fontWeight="medium"
                >
                  (Choose 1 answer)
                </Text>
                <ul>
                  {question.options.map((option, index) => (
                    <li
                      key={option._id}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{ display: "flex", alignItems: "center" }}>
                        <input
                          type="radio"
                          name={question._id}
                          id={`radio-${option._id}`}
                          onChange={() => {
                            handleAnswer(option.isCorrect);
                            setAnsweredQuestions((prevAnswers) => {
                              const newAnswers = prevAnswers.filter(
                                (prevAnswer) =>
                                  prevAnswer.questionId !== question._id
                              );
                              return [
                                ...newAnswers,
                                {
                                  questionId: question._id,
                                  answer: option._id,
                                  isCorrect: option.isCorrect,
                                },
                              ];
                            });
                          }}
                          style={{ display: 'none' }} 
                        />
                        <label
                          htmlFor={`radio-${option._id}`}
                          style={{
                            transition: "all 0.2s ease-in-out",
                            width: "25px",
                            height: "25px",
                            border: "1px solid gray",
                            borderRadius: "50%",
                            marginRight: "8px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            backgroundColor: "transparent",
                            padding: "14px",
                          }}
                          onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#e2e4e7"} // Darken the background on hover
                          onMouseOut={(e) => e.currentTarget.style.backgroundColor = "#f2f4f7"} // Reset the background color
                        >
                          {String.fromCharCode(65 + index)}
                        </label>
                        <p>{option.text}</p>
                        <style jsx>{`
                          input:checked + label {
                            background-color: #4287f5 !important;
                            color: white !important ;
                            border-color: transparent !important;
                          }
                        `}</style>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </ModalBody>
          <ModalFooter>
            <Text fontSize="sm" color="tertiary" mr="auto">
               This progress check is a demo.
            </Text>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Chapter;
