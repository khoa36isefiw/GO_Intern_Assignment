import { useState } from 'react';
import BGWorld from '../../assets/images/ny.jpg';
// import BorderHeading from '../BorderHeading/BorderHeading';
import ny from '../../assets/images/ny.jpg';
import rome from '../../assets/images/rome.jpg';
import barcelona from '../../assets/images/barcelona.jpg';
import amsterdam from '../../assets/images/amsterdam.jpg';
import berlin from '../../assets/images/berlin.jpg';
import milan from '../../assets/images/milan.jpg';
import tokyo from '../../assets/images/tokyo.jpg';
import seoul from '../../assets/images/seoul.jpg';
import { Box } from '@mui/material';

const cityList = [
    {
        name: 'New York',
        thumb: ny,
    },
    {
        name: 'Rome',
        thumb: rome,
    },
    {
        name: 'Barcelona',
        thumb: barcelona,
    },
    {
        name: 'Amsterdam',
        thumb: amsterdam,
    },
    {
        name: 'Berlin',
        thumb: berlin,
    },
    {
        name: 'Milan',
        thumb: milan,
    },
    {
        name: 'Tokyo',
        thumb: tokyo,
    },
    {
        name: 'Seoul',
        thumb: seoul,
    },
];
function WorldWeather({ weather, setCityName }) {
    const [thumb, setThumb] = useState(BGWorld);

    const handleClick = (item) => {
        setCityName(item.name);
        setThumb(item.thumb);
    };

    return (
        <Box
            sx={{
                bgcolor: 'rgb(241 245 249 / 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Box
                component={'img'}
                src={thumb}
                sx={{ height: '200px', width: '150px', borderRadius: '12px' }}
            />

            {/* <Box sx={{ color: color, fontWeight: fontWeight }}>{content}</Box> */}

            <div className="mt-4">
                {/* <BorderHeading content={'AROUND THE WORLD'} color={'#fff'} fontWeight={700} /> */}
                <ul className="mt-2 pl-2 leading-8 text-sm">
                    {cityList.map((item) => (
                        <li
                            key={item.name}
                            onClick={() => handleClick(item)}
                            className="hover:cursor-pointer hover:text-orange-400 "
                        >
                            <i className="fa-solid fa-circle mr-4 text-[6px] text-center" />
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
        </Box>
    );
}

export default WorldWeather;
