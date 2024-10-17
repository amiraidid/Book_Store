import book1 from '../assets/bookw.jpeg'

function Home() {
    const booksType = ['Science', 'Arts', 'Technology', 'Astronomy', 'History', 'Religion Studies'] 
  return (
    <main className="container mx-auto">
        <div className="my-6 flex justify-between items-center">
            <div className="w-full flex-1">
                <h1 className="text-5xl font-bold text-gray-900 ">Discover The Latest Books Available in <span className="text-purple-900 uppercase">Bookia.com</span></h1>
                <ul className='grid grid-cols-2 gap-5 pr-5 my-10'>
                    {booksType.map((book, index) => (
                        <li className='text-2xl text-gray-800 bg-slate-200 odd:bg-purple-400 odd:text-white rounded py-2 px-6 ' key={index}>{book}</li>
                    ))}
                </ul>
                <button className="items-center bg-purple-950 text-white py-2 px-8 rounded-md text-2xl capitalize mt-5 hover:scale-[1.1] hover:bg-purple-800 shadow-lg transition-all">Click here to see more</button>
            </div>
            <img src={book1} alt="" className='w-1/3 object-cover flex-1'/>
        </div>
    </main>
    )
}

export default Home