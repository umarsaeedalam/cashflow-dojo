'use client'

import { Dispatch } from "react"
import { useMediaQuery } from '@react-hook/media-query'
import Pagination from '@mui/material/Pagination'
import PaginationItem from '@mui/material/PaginationItem'
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import { updatePageNumber } from '@/lib/actions'
import { Action } from "@/utils/types"

type Props = {
    pageCount: number;
    currentPage: number;
    dispatch: Dispatch<Action>;
    userId: string;
}

function ExpensesPagination({ pageCount, currentPage, dispatch, userId }: Props) {
    const isMobile = useMediaQuery('(max-width: 630px)')

    function handleChange(event: React.ChangeEvent<unknown>, value: number) {
        dispatch({ type: 'pageChange', payload: value })
        updatePageNumber(userId, currentPage, value)
    };

    const paginationSx = {
        '& .MuiPagination-ul': {
            gap: isMobile ? '0.1rem' : '0.35rem',
        },
        '& .MuiPaginationItem-root': {
            fontFamily: 'inherit',
            color: '#333333',
            fontWeight: 600,
            fontSize: isMobile ? '0.75rem' : '0.875rem',
            padding: isMobile ? '0.60rem' : '0.80rem',
            borderRadius: '6px',
            transition: 'all 0.2s ease-in-out',
            minWidth: 'auto',
            border: '2px solid transparent',
            '&:hover': {
                backgroundColor: '#333333',
                color: '#fafcfd',
            },
            '&.Mui-selected': {
                backgroundColor: '#333333',
                color: '#fafcfd',
                border: '1px solid #333333',
                '&:hover': {
                    backgroundColor: '#333333',
                    color: '#fafcfd',
                },
            },
        },
        '& .MuiPaginationItem-previousNext': {
            '&:hover': {
                backgroundColor: '#333333',
                color: '#fafcfd',
            },
        },
        '& .MuiPaginationItem-ellipsis': {
            color: '#333333',
            fontSize: isMobile ? '0.75rem' : '0.875rem',
            padding: isMobile ? '0.60rem' : '0.80rem',
            '&:hover': {
                backgroundColor: 'transparent',
                color: '#333333',
                cursor: 'default',
            },
        },
    };

    return (
        <div className={`flex items-center justify-center ${isMobile ? 'mt-5' : 'mt-6'}`}>
            <Pagination 
                count={pageCount} 
                page={currentPage} 
                onChange={handleChange}
                renderItem={(item) => (
                    <PaginationItem
                        slots={{ 
                            previous: () => <AiOutlineLeft size={isMobile ? 10 : 12} />, 
                            next: () => <AiOutlineRight size={isMobile ? 10 : 12} />
                        }}
                        {...item}
                    />
                )}
                sx={paginationSx}
            />    
        </div>
    );
}

export default ExpensesPagination;