import React, { useState } from 'react';

const Assignment = ({ match, location }) => {
    let arr = [];
    const { form } = location.state;
    
    form.questions.map((question, index) => {
        let obj = {
            questionID = question.questionId,
            answer = []
        };
        arr.push(obj);
    });

    const [answers, setAnswers] = useState(arr);

    return(
        <div>
            <h1>{form.id}</h1>
            <h2>{form.formTitle}</h2>

            {form.questions.map((question, index) => {
                {question.questionType === 'Free Response' && <TakeFreeResponse />}
                {question.questionType === 'Multiple Choice' && <TakeMultipleChoice />}
                {question.questionType === 'Likert' && <TakeLikert />}
            })}
        </div>
        
    );
}

export default Assignment;