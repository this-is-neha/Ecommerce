// const mongoose = require("mongoose");

// const CategorySchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       min: 2,
//       // Removed unique: true to allow duplicate titles
//     },
//     slug: {
//       type: String,
//       unique: true, // This can remain unique if you want slugs to be unique
//     },
//     parentId: {
//       type: mongoose.Types.ObjectId,
//       ref: "Category",
//       default: null,
//     },
//     status: {
//       type: String,
//       enum: ['active', 'inactive'],
//       default: "inactive",
//     },
//     image: {
//       type: String,
//       required: true,
//     },
//     section: {
//       type: String,
//       enum: ['Men\'s Fashion', 'Women\'s Fashion', 'Kid\'s Fashion', 'Electronics', 'Miscellaneous'],
//       required: true,
//     },
//     createdBy: {
//       type: mongoose.Types.ObjectId,
//       ref: "User",
//       default: null,
//     },
//     updatedBy: {
//       type: mongoose.Types.ObjectId,
//       ref: "User",
//       default: null,
//     },
//   },
//   {
//     timestamps: true,
//     autoCreate: true,
//     autoIndex: true,
//   }
// );

// const CategoryModel = mongoose.model("Category", CategorySchema);

// module.exports = CategoryModel;



const mongoose = require("mongoose");
const slugify = require('slugify');


const CategorySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      min: 2,
    },
    slug: {
      type: String,
      unique: true,  
    },
    parentId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: "inactive",
    },
    image: {
      type: String,
      required: true,
    },
    section: {
      type: String,
      enum: ['Men\'s Fashion', 'Women\'s Fashion', 'Kid\'s Fashion', 'Electronics', 'Miscellanous'],
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
    autoCreate: true,
    autoIndex: true,
  }
);

CategorySchema.pre('save', async function (next) {
  const category = this;


  if (category.isModified('title') || category.isModified('section')) {
 
    let baseSlug = slugify(category.title, { lower: true });


    const sectionInitial = category.section.charAt(0).toLowerCase();

      
    let newSlug = `${baseSlug}-${sectionInitial}-${slugify(category.section, { lower: true })}`;

    let slugExists = await this.constructor.findOne({ slug: newSlug });
    let count = 1;


    while (slugExists) {
      newSlug = `${baseSlug}-${sectionInitial}-${slugify(category.section, { lower: true })}-${count}`;
      slugExists = await this.constructor.findOne({ slug: newSlug });
      count++;
    }

   
    category.slug = newSlug;
  }

  next();
});

// Create the Category model
const CategoryModel = mongoose.model("Category", CategorySchema);

module.exports = CategoryModel;
