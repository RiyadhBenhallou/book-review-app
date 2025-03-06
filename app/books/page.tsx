import { client } from "@/lib/wix"


export default async function Books() {
    const {items: books} = await client.items.query('Books').find()
    console.log(books)
  return (
    <div>
        <h1 className="text-bold-text-2xl">Books</h1>
        <div className="grid grid-cols-3 gap-4">
            {books.map((book) => (
                <div key={book._id} className="bg-white text-black p-4 shadow-md rounded-lg">
                    <h2 className="text-bold-text-xl">{book.name}</h2>
                    <p>{book.author}</p>
                    <p>{book.description}</p>
                </div>
            ))}
        </div>
    </div>  
  )
}