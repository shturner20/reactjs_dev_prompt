import React from 'react'
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default class GitHubPagination extends React.Component
{
    render(){
     
        if(this.props.totalResultCount === 0  )
            return null;

        let activePageNum = this.props.pageNum;

        let totalPageCount = Math.ceil(this.props.totalResultCount / 20);

        let displayPageNums = []; 

        if(activePageNum < 4 && totalPageCount >= 5)
            displayPageNums = [1,2,3,4,5]
        else if(totalPageCount < 5)
        {
            for(let i = 1; i <= totalPageCount; i++)
            {
                displayPageNums.push(i);
            }
        }
        else if(activePageNum === totalPageCount)
            displayPageNums=[activePageNum-4, activePageNum-3,activePageNum-2, activePageNum-1,activePageNum ]
        else
            displayPageNums=[activePageNum-3, activePageNum-2,activePageNum-1, activePageNum, activePageNum+1 ]
        
       
        return (
            <div style={{display: this.props.disabled ? 'none' : 'inline'}} >
                <Row>
                    <Col>
                        <Pagination>
                        <Pagination.First onClick={() => this.props.onPageChange(1)} />
                        <Pagination.Prev onClick={() => activePageNum > 1 && this.props.onPageChange(activePageNum-1)} />    
                       

                        {displayPageNums.map(page => activePageNum === page ? 
                        <Pagination.Item key={page} active onClick={() => this.props.onPageChange(page)}>{page}</Pagination.Item> 
                        : <Pagination.Item key={page} onClick={() => this.props.onPageChange(page)}>{page}</Pagination.Item> )}


                        
                        <Pagination.Next onClick={() => activePageNum !== totalPageCount &&  this.props.onPageChange(activePageNum + 1)} />
                        <Pagination.Last onClick={() => this.props.onPageChange(totalPageCount)} />
                        </Pagination>

                       
                    </Col>
                </Row>
               
            </div>
        )
    }
}