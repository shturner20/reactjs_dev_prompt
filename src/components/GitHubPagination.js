import React from 'react'
import Pagination from 'react-bootstrap/Pagination';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


export default class GitHubPagination extends React.Component
{
    render(){

        if(this.props.totalResultCount === 0)
            return null;

        let activePageNum = this.props.pageNum;

        let totalPageCount = this.props.totalResultCount / 100;

        let displayPageNums; 

        if(activePageNum < 4)
            displayPageNums = [1,2,3,4,5]
        else
            displayPageNums=[activePageNum-3, activePageNum-2,activePageNum-1, activePageNum, activePageNum+1 ]
        
       
        return (
            <div>
                <Row>
                    <Col>
                        <Pagination>
                        <Pagination.First onClick={() => this.props.onPageChange(1)} />
                        <Pagination.Prev onClick={() => this.props.onPageChange(activePageNum-1)} />    
                        {/* {activePageNum > 3 && <Pagination.Item onClick={() => this.props.onPageChange(1)}>{1}</Pagination.Item>}               */}

                        {displayPageNums.map(page => activePageNum === page ? 
                        <Pagination.Item key={page} active onClick={() => this.props.onPageChange(page)}>{page}</Pagination.Item> 
                        : <Pagination.Item key={page} onClick={() => this.props.onPageChange(page)}>{page}</Pagination.Item> )}


                        {/* {activePageNum > totalPageCount-3 && <Pagination.Item onClick={() => this.props.onPageChange(totalPageCount)}>{totalPageCount}</Pagination.Item>}               */}
                        <Pagination.Next onClick={() => this.props.onPageChange(activePageNum + 1)} />
                        <Pagination.Last onClick={() => this.props.onPageChange(totalPageCount)} />
                        </Pagination>

                       
                    </Col>
                </Row>
               
            </div>
        )
    }
}