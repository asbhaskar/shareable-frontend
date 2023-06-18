import { Box } from '@mui/system';
import React from 'react';

interface ImageBlockInterface {
    imgs: { src: string; alt: string }[];
}

const ImageBlock = ({ imgs }: ImageBlockInterface) => {
    return (
        <Box>
            {imgs.length === 0 && (
                <Box>
                    <img src={imgs[0].src} alt={imgs[0].alt} />
                </Box>
            )}
            {imgs.length === 1 && <Box></Box>}
            {imgs.length === 2 && <Box></Box>}
            {imgs.length === 3 && <Box></Box>}
            {imgs.length > 3 && <Box></Box>}
        </Box>
    );
};

export default ImageBlock;
