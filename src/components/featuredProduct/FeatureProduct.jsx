import React, { useState, useContext, useEffect } from 'react';
import { getFeaturedProducts } from "../../services/api";
import {
   Card,
   CardActions,
   CardContent,
   CardMedia,
   Button,
   Typography,
   Grid
} from "@mui/material";
import Spinner from "../spinners/Spinner";
import { newData } from "../context/ContextProvider";
import { useDispatch } from "react-redux";
import { ADD } from '../../redux/actions/actions'

function FeatureProduct() {

   const [productId, setProductId] = useState([]);
   const [showspin, setShowSpin] = useState(true);
   const { feature } = useContext(newData);
   const dispatch = useDispatch()

   useEffect(() => {
      featuredProducts();

      setTimeout(() => {
         setShowSpin(false)
      }, 1500)
   }, []);

   async function featuredProducts() {
      let data = await getFeaturedProducts();
      setProductId(data.data.featured);
   }

   const send = (e) => {
      dispatch(ADD(e))
   }


   let newArray = feature.filter(function (el) {
      return this.has(el.id);
   }, new Set(productId.map(el => el.id)));


   return (
      <>
         {
            showspin ? <Spinner /> :
               <Grid container spacing={12}>
                  <Grid item xs={12}>
                     <Grid container justifyContent="center" spacing={12}>
                        {newArray && newArray.length ? (
                           newArray.map((data, index) => {
                              return (


                                 <Grid key={index} item>
                                    <Card>
                                       <CardMedia
                                          sx={{ height: 330, width: 300 }}
                                          image={data.image}
                                          title="green iguana"
                                       />
                                       <CardContent>
                                          <Typography gutterBottom variant="h5" component="div">
                                             {data.name}
                                          </Typography>
                                          <Typography variant="body2" color="text.secondary">
                                             {data.materialId}
                                          </Typography>
                                       </CardContent>
                                       <CardActions>
                                          <Button size="small">$ {data.price}</Button>
                                          <Button size="small">{data.colorid}</Button>
                                          <Button variant="contained" onClick={() => send(data)} >Add to Cart</Button>
                                       </CardActions>
                                    </Card>

                                 </Grid>

                              );
                           })
                        ) : (
                           <h1>No data</h1>
                        )}
                     </Grid>
                  </Grid>
               </Grid>
         }
      </>
   )
}

export default FeatureProduct