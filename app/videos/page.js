/* eslint-disable @next/next/no-img-element */
/* eslint-disable @next/next/no-async-client-component */
"use client";
import Link from 'next/link'; // Import Link from Next.js
import { useEffect, useState } from 'react';

const Video = () => {
    const [moviesData, setMoviesData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`https://endgame-team-server.vercel.app/movies`, { cache: 'no-cache' });

                if (!res.ok) {
                    console.error(`Failed to fetch data. Status: ${res.status}`);
                } else {
                    const data = await res.json();
                    setMoviesData(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        return () => {
            // Cleanup function (optional)
        };
    }, []);

    return (
        <div>
            
            <section className="mx-12">

                <div className=' flex justify-between py-4 items-center'>
                    <h2 className='text-white  text-lg font-semibold'>Latest Movies</h2>
                    {/* <span className='text-white text-xs py-1 px-3  bg-red-600'>SEE ALL</span> */}
                </div>

                <div className="grid place-content-center grid-cols-1 md:grid-cols-2 lg:grid-cols-6  gap-4 gap-y-8">
                    {moviesData.map(item => (
                        <div key={item._id}>
                            <Link href={`/videos/${item._id}`}>
                                <div className="max-w-xs relative text-white h-72 rounded-md shadow-md overflow-hidden">
                                    <img
                                        className="h-[265px] object-cover rounded-sm"
                                        src={item?.thumbnail?.link}
                                        alt="Movie Poster"
                                        width={400}
                                        height={200}
                                    />
                                    <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-slate-950 opacity-100"></div>
                                    <p className="absolute top-0 right-0 rounded-sm px-1 text-[12px] font-light bg-green-500">Original</p>
                                    <div className="flex flex-col z-0 py-1 relative">
                                        <span className="text-sm">{item?.movieName?.slice(0, 20)}...</span>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>


            </section>
        </div>
    );
};

export default Video;
