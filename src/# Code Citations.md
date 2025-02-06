# Code Citations

## License: MIT

https://github.com/Kraizan/Second-Hand/tree/dc795b3074c36a55021edfc2c55490481a93a809/Server/config/db.js

```
) => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:"
```
