import '../../styles/loadingSpinner.css';

export default function Loading() {
    return (
        <div className='h-full flex items-center justify-center'>
            <div className="lds-ellipsis">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            </div>
        </div>
  );
}