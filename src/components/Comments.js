import React, { useState, useEffect } from 'react'

function Comments(props) {

  const [comments, setComments] = useState([])

  useEffect(() => {
    setComments(props.comments)
  }, [props.comments]);

    const commentList = comments.map((comment, index)=>{
        return(
        <div key={index} className="comments">
            <h3>-{comment.name}</h3>
            <p>{comment.data}</p>
            <p>{comment.content}</p>
        </div>
        )
    })
  return (
    <div>
       <h5 className="comment-title">Comments</h5>
      { commentList }

    </div>
  )
}

export default Comments;