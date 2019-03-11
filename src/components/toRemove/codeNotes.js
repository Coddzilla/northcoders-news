/*
 componentDidMount() {
    const retrievedState = localStorage.getItem('state')
    if (retrievedState) {
      this.setState(JSON.parse(retrievedState));
    }
  }
  componentDidUpdate() {
    this.handleSave();
  }
  handleSave = () => {
    localStorage.setItem('state', JSON.stringify(this.state))
  }
*/

{
  /* {dataToView.length === 0 && (
              <h2>
                There are currently no comments for this. Why don't you be the
                first!?
              </h2>
            )}

            <div>
              <PostAComment
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                newComment={this.state.newComment}
              />
              <div>
                {dataToView.length !== 0 &&
                  dataToView.map(comment => {
                    return (
                      <div key={comment.comment_id}>
                        <h4>Comment: </h4>
                        <p className="comment">{comment.body}</p>
                        <Voter
                          id={comment.comment_id}
                          votes={comment.votes}
                          type="comment"
                        />
                        <h5>Written by:{comment.author}</h5>
                        <h5>created at: {comment.created_at}</h5>
                        <h5>id: {comment.comment_id}</h5>
                        {this.props.username === comment.author && (
                          <button
                            className="button"
                            onClick={() => {
                              this.handleClick(
                                this.props.article.article_id,
                                comment.comment_id
                              );
                            }}
                            // key="deleteComment"
                          >
                            Delete comment
                          </button>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div> */
}
