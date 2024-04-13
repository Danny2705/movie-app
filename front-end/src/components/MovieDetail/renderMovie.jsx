import Review from "../Review/Review";

export const renderMovie = (selected, info, detail) => {
  if (selected === "Movie Detail") {
    return (
      <div>
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
        <Review />
      </div>
    );
  } else if (selected === "Character" && detail) {
    return (
      <div className=''>
        <div className='flex min-h-[100vh] flex-wrap justify-between mt-4 max-w-[866px]'>
          {detail.map((character, i) => (
            <div key={i}>
              <div className='w-[200px] h-[330px] relative '>
                <div className='name-container'>
                  <img
                    src={character.character.images?.webp.image_url}
                    alt={character.role}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </div>
                <div className='thumbnail w-full absolute top-0 p-2'>
                  {character.character.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  } else if (selected === "Trailer") {
    return (
      <div className='w-full bg-[#0f1416] mt-4 p-4 px-10 flex justify-between'>
        {info.trailer.embed_url === null ? (
          <div className='text-xl'>No Trailer</div>
        ) : (
          <iframe
            width='760'
            height='515'
            src={info.trailer.embed_url}
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            className='z-10'
          ></iframe>
        )}
      </div>
    );
  } else if (selected === "Image") {
    return (
      <div className='mt-4 w-full flex flex-wrap gap-4 max-w-[866px]'>
        {detail.map((pic, index) => (
          <div key={index}>
            <div className='w-[200px] h-[330px]'>
              <img
                src={pic.webp.large_image_url}
                alt='More Pictures of Anime'
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  } else if (selected === "Staff") {
    return (
      <div className=''>
        <div className='flex min-h-[100vh] flex-wrap justify-between mt-4 max-w-[866px]'>
          {detail.map((staff, i) => (
            <div key={i}>
              <div className='w-[200px] h-[330px] relative '>
                <div className='name-container'>
                  <img
                    src={staff.person.images.jpg.image_url}
                    alt={staff.name}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                  />
                </div>
                <div className='thumbnail w-full absolute top-0 p-2'>
                  {staff.person.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
};
