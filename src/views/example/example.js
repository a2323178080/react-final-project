import "./example.scss"
import {useState, useEffect} from "react";

import axios from "axios";


import {Card} from 'antd';
const {Meta} = Card;


export default function Example(){

    const [jsonData, setJsonData] = useState([])
    useEffect(() => {
        (async () => {
            try {
                const result = await axios.get("https://api.themoviedb.org/3/movie/popular",{
                        headers:{
                            Authorization:'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTk3ZGYwMDcxNWY0NTUzZjIzZGEyMjAwMDAwNWU2NCIsInN1YiI6IjY0ZWVjZmFmZTBjYTdmMDEwZGUzMDEwNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.mRvMsgvoJ1Txli7oaUf8uqS9DpR1CR2oqCZFg3Zbmyc'
                        }
                    }
                )
                setJsonData(result.data.results);
            } catch (error) {
                console.log("錯")
            }
        })()
    }, [])


    return(
        <div className="example">
            {jsonData.map((item) => {
                return (
                    <div key={item.id}>
                        <Card
                            hoverable
                            style={{
                                width: '300px',height:'500px',
                            }}
                            cover={<img alt="example" src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`}
                                        style={{height: '200px', objectFit: 'cover'}}/>}>
                            <Meta title={item.title} description={item.overview}/>


                        </Card>

                    </div>
                )
            })}
        </div>
    )
}