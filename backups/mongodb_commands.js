User.find({})

User.findOne({
	email: 'alex@gmail.com'
})

User.findById('id_here')

User.find({
	email: 'alex@gmail.com',
	age: 45
})

// object attribute
User.find({
	"name.firstName": "Paulo"
})

// array
User.find({
	interests: "pizza"
});

// gt = greater then
// gte = greater then or equal
// lt = lower then
// lte = lower then or equal

// greater then
User.find({
	age: { $gt: 18 }
});

User.find({
	age: { $gt: 18}
}).sort({
	age: 1 // ASC
	age: -1 // DESC
});

// limit 2
// offset 0
User.find({
	age: { $gt: 18}
}).skip(0).limit(2);


// INSERT/CREATE
let newUser = await User.create({
	name: 'pedro',
	email: 'pedro@gmail.com',
	interests: ['art', 'pizza']
	age: 24
})

let newUser = new User();
newUser.name = 'pedro'
newUser.email = 'pedro@gmail.com'
newUser.interests = ['art', 'pizza']
newUser.age = 42
let resultado = await newUser.save()


// UPDATE/PATCH

// update all ages less than 18 and patch equal to 18
await User.updateMany(
	{ age: {$lt:18}},
	{ age: 18}
);

// update 1
await User.updateOne(
	{ email: 'pedro@gmail.com' },
	{ age: 18}
);

let paulo = await User.findOne({email: 'paulo@gmail.com'})
paulo.age = 42
await paulo.save()

let user = await User.findOneAndUpdate(
	{ email: 'pedro@gmail.com' },
	{ age: 18}
)

// DELETE
await User.findOneAndDelete({email: 'paulo@gmail.com'})

let paulo = await User.findOne({email: 'paulo@gmail.com'})
await paulo.remove()