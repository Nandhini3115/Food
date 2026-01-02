const express=require('express');
const router=express.Router();
let foods=[
    {id:1, name: "Biriyani", type:"main course", price:200},
    {id:2, name: "Chicken 65", dept:"side dish", age:145}
];
router.get('/',(req,res)=>{
    res.json(foods);
});
router.put('/:id',(req, res)=>{
    const id =parseInt(req.params.id);
    const updateName= req.body.name;
    foods=foods.map(food =>
        food.id===id?{...food, name:updateName}:food
    );
    res.json({
        message:"Food updated successfully",
        foods
    });
});  
router.post('/',(req, res)=>{
    const newFoods=req.body;
    foods.push(newFoods);
    res.status(201).json({
        message:"Food added successfully",
        foods
    });
});
router.post('/',(req, res)=>{
    const newFoods=req.body;
    if(Array.isArray(newFoods)){
        foods.push(...newFoods);
    }else {
        foods.push(newFoods);
    }
    res.status(201).json({
        message:"Food added successfully",
        foods
    });
});
router.put('/',(req,res)=>{
    const updates=req.body;
    updates.forEach(update=>{
        foods=foods.map(food=>
            food.id===update.id
                ?{...food, name: update.name}
                :food
        );
    });
    res.json({
        message:"Food added successfully",
        foods
    });
});
router.delete('/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    foods=foods.filter(food=>food.id!==id);
    res.json({
        message:"Food deleted successfully",
        foods
    });
});

router.delete('/',(req,res)=>{
    const idsToDelete=req.body;
    foods=foods.filter(
        food=>!idsToDelete.includes(food.id)
    );
    res.json({
        message:"Food deleted successfully",
        foods
    });
});


module.exports=router;