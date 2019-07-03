import React from 'react';

export default ({ className, title }: { className?: string, title?: string }) => (
  <svg className={`cl-icon ${className ? className : ''}`} width="47" height="48" viewBox="0 0 47 48" fill="none">
    {title ? (<title>{title}</title>) : null}
    <path d="M28.7133 19.2C26.1468 19.2 24.7031 18.08 23.5802 16.96C22.4573 16 21.4949 15.2 19.4096 15.2C17.3242 15.2 16.3618 16 15.2389 16.96C13.9556 17.92 12.5119 19.2 9.94539 19.2C7.37884 19.2 6.09556 18.08 4.9727 16.96C3.84983 16 2.88737 15.2 0.802048 15.2C0.16041 15.2 0 14.88 0 14.4C0 13.92 0.320819 13.6 0.802048 13.6C3.3686 13.6 4.81229 14.72 5.93515 15.84C7.05802 16.8 8.02048 17.6 10.1058 17.6C12.1911 17.6 13.1536 16.8 14.2764 15.84C15.3993 14.88 16.843 13.6 19.4096 13.6C21.9761 13.6 23.4198 14.72 24.5427 15.84C25.6655 16.8 26.628 17.6 28.7133 17.6C29.1945 17.6 29.5154 17.92 29.5154 18.4C29.5154 18.88 29.1945 19.2 28.7133 19.2Z" fill="#D8D8D8" />
    <path d="M28.7133 27.2C26.1468 27.2 24.7031 26.08 23.5802 24.96C22.4573 24 21.4949 23.2 19.4096 23.2C17.3242 23.2 16.3618 24 15.2389 24.96C14.116 25.92 12.6724 27.2 10.1058 27.2C7.53925 27.2 6.09556 26.08 4.9727 24.96C3.84983 24 2.88737 23.2 0.802048 23.2C0.320819 23.2 0 22.88 0 22.4C0 21.92 0.320819 21.6 0.802048 21.6C3.3686 21.6 4.81229 22.72 5.93515 23.84C7.05802 24.8 8.02048 25.6 10.1058 25.6C12.1911 25.6 13.1536 24.8 14.2764 23.84C15.3993 22.88 16.843 21.6 19.4096 21.6C21.9761 21.6 23.4198 22.72 24.5427 23.84C25.6655 24.8 26.628 25.6 28.7133 25.6C29.1945 25.6 29.5154 25.92 29.5154 26.4C29.5154 26.88 29.1945 27.2 28.7133 27.2Z" fill="#D8D8D8" />
    <path d="M28.7133 35.2C26.1468 35.2 24.7031 34.08 23.5802 32.96C22.4573 32 21.4949 31.2 19.4096 31.2C17.3242 31.2 16.3618 32 15.2389 32.96C14.116 33.92 12.6724 35.2 10.1058 35.2C7.53925 35.2 6.09556 34.08 4.9727 32.96C3.84983 32 2.88737 31.2 0.802048 31.2C0.320819 31.2 0 30.88 0 30.4C0 29.92 0.320819 29.6 0.802048 29.6C3.3686 29.6 4.81229 30.72 5.93515 31.84C7.05802 32.8 8.02048 33.6 10.1058 33.6C12.1911 33.6 13.1536 32.8 14.2764 31.84C15.3993 30.88 16.843 29.6 19.4096 29.6C21.9761 29.6 23.4198 30.72 24.5427 31.84C25.6655 32.8 26.628 33.6 28.7133 33.6C29.1945 33.6 29.5154 33.92 29.5154 34.4C29.5154 34.88 29.1945 35.2 28.7133 35.2Z" fill="#D8D8D8" />
    <path d="M17.6451 20.16V17.28C17.3243 17.44 16.8431 17.76 16.3619 18.24C15.5598 19.04 14.437 19.84 12.6724 20.48C12.512 21.44 12.1912 22.4 11.3892 23.04C11.3892 23.04 11.2288 23.36 11.2288 23.52V23.84C12.0308 23.68 12.512 23.2 13.3141 22.56C14.2765 21.76 15.5598 20.64 17.6451 20.16Z" fill="#D8D8D8" />
    <path d="M28.8736 20.8C25.6654 20.8 23.9009 19.36 22.6176 18.24C21.4948 17.28 21.0135 16.8 19.5698 16.8C19.4094 16.8 19.4094 16.8 19.249 16.8V20C19.4094 20 19.4094 20 19.5698 20C22.778 20 24.5425 21.44 25.8258 22.56C26.9487 23.52 27.4299 24 28.8736 24C30.1569 24 31.2797 25.12 31.2797 26.4C31.2797 27.68 30.1569 28.8 28.8736 28.8C25.6654 28.8 23.9009 27.36 22.6176 26.24C21.4948 25.28 21.0135 24.8 19.5698 24.8C19.4094 24.8 19.4094 24.8 19.249 24.8V28C19.4094 28 19.4094 28 19.5698 28C22.778 28 24.5425 29.44 25.8258 30.56C26.9487 31.52 27.4299 32 28.8736 32C30.1569 32 31.2797 33.12 31.2797 34.4C31.2797 35.68 29.9965 36.8 28.8736 36.8C25.6654 36.8 23.9009 35.36 22.6176 34.24C21.4948 33.28 21.0135 32.8 19.5698 32.8C19.4094 32.8 19.4094 32.8 19.249 32.8V40H38.4982V8H19.249V12C19.4094 12 19.4094 12 19.5698 12C22.778 12 24.5425 13.44 25.8258 14.56C26.9487 15.52 27.4299 16 28.8736 16C30.1569 16 31.2797 17.12 31.2797 18.4C31.2797 19.68 29.9965 20.8 28.8736 20.8Z" fill="#D8D8D8" />
    <path d="M17.6451 28.16V25.28C17.3243 25.44 16.8431 25.76 16.3619 26.24C15.5598 27.04 14.437 27.84 12.6724 28.48C12.512 29.44 12.1912 30.4 11.3892 31.04C11.3892 31.04 11.2288 31.36 11.2288 31.52V31.84C12.0308 31.68 12.512 31.2 13.3141 30.56C14.2765 29.76 15.5598 28.64 17.6451 28.16Z" fill="#D8D8D8" />
    <path d="M46.3582 8.48V7.52C46.3582 7.36 46.1978 7.04 46.0374 6.88C45.2353 6.24 44.7541 5.12 44.7541 4C44.7541 3.04 45.0749 2.08 45.877 1.28C46.0374 1.12 46.1978 0.64 46.0374 0.48C45.877 0.16 45.7166 0 45.2353 0H44.2729C44.1125 0 43.7917 0.16 43.6313 0.32C42.0272 2.08 39.3002 2.08 37.6961 0.32C37.8565 0.16 37.5357 0 37.2149 0H36.2524C36.092 0 35.7712 0.16 35.6108 0.32C34.0067 2.08 31.2797 2.08 29.6756 0.32C29.836 0.16 29.5152 0 29.1944 0H28.2319C28.0715 0 27.7507 0.16 27.5903 0.32C25.9862 2.08 23.2592 2.08 21.6551 0.32C21.8156 0.16 21.4947 0 21.1739 0H20.2115C20.051 0 19.7302 0.16 19.5698 0.32C17.9657 2.08 15.2388 2.08 13.6347 0.32C13.6347 0.16 13.3138 0 13.1534 0H12.191C11.8702 0 11.5493 0.16 11.5493 0.48C11.3889 0.8 11.5493 1.12 11.7098 1.28C12.3514 2.08 12.6722 3.04 12.6722 4C12.6722 5.12 12.191 6.24 11.3889 6.88C11.2285 7.04 11.0681 7.36 11.0681 7.52V8.48C11.0681 8.64 11.2285 8.96 11.3889 9.12C12.191 9.76 12.6722 10.88 12.6722 12C12.6722 13.12 12.191 14.24 11.3889 14.88C11.2285 15.04 11.0681 15.36 11.0681 15.52V15.84C11.8702 15.68 12.3514 15.2 13.1534 14.56C14.1159 13.76 15.3992 12.64 17.4845 12.16V7.2C17.4845 6.72 17.8053 6.4 18.2865 6.4H39.1398C39.621 6.4 39.9418 6.72 39.9418 7.2V40.8C39.9418 41.28 39.621 41.6 39.1398 41.6H18.2865C17.8053 41.6 17.4845 41.28 17.4845 40.8V33.28C17.1637 33.44 16.6824 33.76 16.2012 34.24C15.3992 35.04 14.2763 35.84 12.5118 36.48C12.3514 37.44 12.0306 38.4 11.2285 39.04C11.2285 39.04 11.0681 39.36 11.0681 39.52V40.48C11.0681 40.64 11.2285 40.96 11.3889 41.12C12.191 41.76 12.6722 42.88 12.6722 44C12.6722 44.96 12.3514 45.92 11.5493 46.72C11.3889 46.88 11.2285 47.36 11.3889 47.52C11.5493 47.84 11.8702 48 12.191 48H13.1534C13.3138 48 13.6347 47.84 13.7951 47.68C15.3992 45.92 18.1261 45.92 19.7302 47.68C19.7302 47.84 20.051 48 20.2115 48H21.1739C21.3343 48 21.6551 47.84 21.8156 47.68C23.4197 45.92 26.1466 45.92 27.7507 47.68C27.9111 47.84 28.0715 48 28.3923 48H29.3548C29.5152 48 29.836 47.84 29.9964 47.68C31.6005 45.92 34.3275 45.92 35.9316 47.68C36.092 47.84 36.2524 48 36.5732 48H37.5357C37.6961 48 38.0169 47.84 38.1773 47.68C39.7814 45.92 42.5084 45.92 44.1125 47.68C44.2729 47.84 44.4333 48 44.7541 48H45.877C46.1978 48 46.5186 47.84 46.679 47.52C46.8394 47.2 46.679 46.88 46.5186 46.72C45.877 45.92 45.3958 44.96 45.3958 44C45.3958 42.88 45.877 41.76 46.679 41.12C46.8394 40.96 46.9999 40.8 46.9999 40.48V39.52C46.9999 39.36 46.8394 39.04 46.679 38.88C45.877 38.08 45.3958 37.12 45.3958 36C45.3958 34.88 45.877 33.76 46.679 33.12C46.8394 32.96 46.9999 32.8 46.9999 32.48V31.52C46.9999 31.36 46.8394 31.04 46.679 30.88C45.877 30.08 45.3958 29.12 45.3958 28C45.3958 26.88 45.877 25.76 46.679 25.12C46.8394 24.96 46.9999 24.8 46.9999 24.48V23.52C46.9999 23.36 46.8394 23.04 46.679 22.88C45.877 22.08 45.3958 21.12 45.3958 20C45.3958 18.88 45.877 17.76 46.679 17.12C46.8394 16.96 46.9999 16.8 46.9999 16.48V15.52C46.9999 15.36 46.8394 15.04 46.679 14.88C45.3958 14.24 44.9145 13.12 44.9145 12C44.9145 10.88 45.3958 9.76 46.1978 9.12C46.3582 8.96 46.3582 8.64 46.3582 8.48Z" fill="#D8D8D8" />
  </svg>
);
