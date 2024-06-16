import React, { useEffect, useState } from "react";

export const Quiz = props => {
    const [count, setCount] = useState(1);
    const [isActive, setIsActive] = useState(true);
    const [isCorrect, setIsCorrect] = useState();
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [checkCircles, setCheckCircles] = useState([]);
    
    useEffect(() => {
        if (props.questions.length<=count) {
            setIsActive(false)
        }
    }, [count])

    return (
        <div id="container">
            <p id="question-number">Question {count} of {props.questions.length}</p>
            {props.questions.map((question, number) => {
                if(++number === count) {
                    return(
                        <div key={number}>
                            <p id="question">{question.question}</p>
                            <div>
                                {question.answers.map((answer, key) => {
                                    return(
                                        <p  
                                            key={number}
                                            className={
                                                selectedAnswer === key
                                                ? isCorrect
                                                    ? "answer answer-true" 
                                                    : "answer answer-false"
                                                : "answer"
                                            }
                                            onClick={() => {
                                                if (selectedAnswer === null) {
                                                    setSelectedAnswer(key)
                                                    if (answer.isCorrect) {
                                                        setIsCorrect(true)
                                                        setCheckCircles(checkCircles => [...checkCircles,true]) 
                                                    } else {
                                                        setIsCorrect(false)
                                                        setCheckCircles(checkCircles => [...checkCircles,false])
                                                    }
                                                }
                                            }}
                                        >{answer.text}</p>
                                    )
                                })}
                            </div>
                        </div>
                    )
                } 
            })}
            <p className={selectedAnswer !== null && isActive ? "button button-active" : "button button-disabled"} onClick={() => {
                if (selectedAnswer !== null && isActive) {
                    setIsCorrect(null)
                    setSelectedAnswer(null)
                    setCount(count + 1)
                }
                }}
            >Next</p>
            <div id= "checbox-container">
                {props.questions.map((question, number) => {
                    return (
                        <div 
                            key={number}
                            className={
                                number in checkCircles
                                ? checkCircles[number]
                                    ? "checkbox checkbox-true checkbox-true::after"
                                    : "checkbox checkbox-false checkbox-false::after"
                                : "checkbox"
                            }
                        ></div>
                    )
                })}
            </div>
        </div>
    );
};

export default Quiz;