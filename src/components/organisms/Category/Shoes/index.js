import {useState, useEffect} from 'react'
import style from './shoes.module.css'
import axios from 'axios'
import { FaStar } from 'react-icons/fa'
import { useHistory } from 'react-router'

function Shoes() {
  const history = useHistory()
  const [getShoes, setGetShoes] = useState([])
  // Untuk Banyaknya rating/bintang
  const [rating, setRating] =useState(null)

  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_URL}/product/category/4`)
    .then((res)=>{
      const dataAllShoes = res.data.data
    //   console.log(dataAllShoes);
      setGetShoes(dataAllShoes)
     
      // setRating(4) 
    })
    .catch((err)=>{
      console.log(err);
    })
  }, [])

  return (
    <div>
      <div className="container">
        <p className={style["navigation"]}>Home - Category - Shoes</p>
        <p className={style["title"]}>Shoes</p>
        <div className="row">
          {getShoes !== undefined ? getShoes.map((item)=>{
          return (
          <>
          <div className="col-lg-3 col-6 mb-5" onClick={()=>{ history.push('/product')}}>
            <div className={style["card"]}>
              <img className={[["card-img-top"], style["product-img"]].join(' ')} src={`${process.env.REACT_APP_API_IMG}${item.image}`} alt=""/>
              <div className="card-body">
                <p className={style["product-name"]}>{item.title}</p>
                <p className={style["price"]}>Rp {item.price}</p>
                <p className={style["teks-store"]}>{item.brand}</p>
                {[...Array(5)].map((star, i)=>{
                  const ratingValue = i + 1;
                  return (
                    <>
                    <FaStar 
                      className={style["star"]} 
                      size={25}
                      color={ratingValue <= (item.rating) ? '#FFBA49' : '#D4D4D4'}
                    />
                  </>
                  ) 
                })}
              </div>
            </div>
          </div>
          </>
          )
          }) : console.log("try again")} 
        </div>
      </div>
    </div>
  )
}

export default Shoes