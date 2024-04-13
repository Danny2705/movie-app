export const renderMovie = (selected, info, detail) => {
  console.log(detail);
  if (selected === "Movie Detail") {
    return (
      <div className='w-full bg-[#0f1416] mt-4 p-4 px-10 flex justify-between'>
        <div className='flex flex-col gap-3'>
          <h2 className='text-sm flex items-center gap-3'>
            Episodes:{" "}
            <span className='text-main-red font-bold'>{info.episodes}</span>
          </h2>
          <p className='text-sm flex items-center gap-3'>
            Status:{" "}
            <span className='text-main-red font-bold'>{info.status}</span>
          </p>
          <p className='text-sm flex items-center gap-3'>
            Duration:{" "}
            <span className='text-main-red font-bold'>{info.duration}</span>
          </p>
          <p className='text-sm flex items-center gap-3'>
            Season:{" "}
            <span className='text-main-red capitalize font-bold'>
              {info.season}
            </span>
          </p>
          <p className='text-sm flex items-center gap-3'>
            Themes:{" "}
            <span className='text-main-red font-bold'>
              {info.themes.map((theme, index) => (
                <span key={index}>
                  {index !== 0 && ", "} {theme.name}
                </span>
              ))}
            </span>
          </p>
        </div>

        <div className='flex flex-col gap-3'>
          <h2 className='text-sm flex items-center gap-3'>
            Genres:{" "}
            <span className='text-main-red font-bold'>
              {info.genres.map((genre, index) => (
                <span key={index}>
                  {index !== 0 && ", "} {genre.name}
                </span>
              ))}
            </span>
          </h2>

          <p className='text-sm flex items-center gap-3'>
            Rating:{" "}
            <span className='text-main-red font-bold'>{info.rating}</span>
          </p>
          <p className='text-sm flex items-center gap-3'>
            Rank: <span className='text-main-red font-bold'>{info.rank}</span>
          </p>
          <p className='text-sm flex items-center gap-3'>
            Studio:{" "}
            <span className='text-main-red font-bold'>
              {info.studios.map((studio, index) => (
                <span key={index}>
                  {index !== 0 && ", "} {studio.name}
                </span>
              ))}
            </span>
          </p>

          <p className='text-sm flex items-center gap-3'>
            Favorite:{" "}
            <span className='text-main-red font-bold'>
              {info.favorites.toLocaleString()}
            </span>
          </p>
        </div>
      </div>
    );
  } else if (selected === "Character" && detail) {
    return (
      <div className=''>
        <div className=''>
          {detail.map((character) => (
            <div key={character.mal_id} className='h-full'>
              <img
                src={character.character.images?.webp.image_url}
                alt={character.role}
                width={300}
                height={400}
              />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return null;
  }
};
