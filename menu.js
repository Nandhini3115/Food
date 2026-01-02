const express=require('express');
const app=express();
const PORT = 3000;
app.use(express.json());
const foodRoutes=require('./routes/foodRoutes');
app.use('/foods',foodRoutes);
app.get('/',(req,res)=>{
    res.send('Food management API is running');
});
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});