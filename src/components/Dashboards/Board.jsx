import React from 'react';
import BoardCard from './BoardCard';
import Team from '../Teams/Team';



const Board = () => {
    return (
        <section >

            <div className='grid lg:grid-cols-3 grid-cols-3 lg:gap-6 gap-3'>
                {/* card 1 */}
                <div className='lg:w-[50vh] w-full'>
                    <BoardCard
                        title={"TO DO"}
                    ></BoardCard>
                </div>

                {/* card 2 */}
                <div className='lg:w-[50vh] w-full'>
                    <BoardCard
                        title={"IN PROGRESS"}
                    ></BoardCard>
                </div>

                {/* card 3 */}
                <div className='lg:w-[50vh] w-full'>
                    <BoardCard
                        title={"DONE"}
                    ></BoardCard>
                </div>

            </div>  

         

        </section>
    );
};

export default Board;