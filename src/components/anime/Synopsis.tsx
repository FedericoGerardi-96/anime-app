interface Props {
  synopsis: string;
  idButton: string;
  idContainer: string;
}

const Synopsis = ({ synopsis, idButton, idContainer }: Props) => {
  return (
    <div className='mt-4'>
      <p className='font-ubuntu700'>Synopsis:</p>
      <div id={idContainer} className='max-h-12 overflow-hidden relative'>
        <p>{synopsis}</p>
        <button
          id={idButton}
          onClick={() => {
            const readMoreBtn = document.getElementById(idButton) as HTMLElement;
            const synopsisContainer = document.getElementById(idContainer) as HTMLElement;
            if (synopsisContainer) {
              synopsisContainer.classList.remove('max-h-12');
              synopsisContainer.classList.add('max-h-full');
              console.log(readMoreBtn);
              readMoreBtn?.classList.add('hidden');
            }
          }}
          className='absolute bottom-0 left-0 w-full h-full bg-gradient-to-t from-background via-background to-transparent
               text-primary hover:text-primary/75 transition-colors disabled:hidden'
          disabled={synopsis.length <= 150}>
          Read More
        </button>
      </div>
    </div>
  );
};

export default Synopsis;
