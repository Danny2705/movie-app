import { useSelector } from "react-redux";
import Review from "../Review/Review";

const RenderMovie = (selected, info, detail) => {
  const darkMode = useSelector((state) => state.theme.darkMode);
  if (selected === "Movie Detail") {
    return (
      <div>
        <div
          className={`${darkMode ? "text-white" : "text-black"} w-full ${
            darkMode ? "bg-[#0f1416]" : "bg-[#ccc]"
          } mt-4 p-4 px-10 flex max-w-[828px]:flex-col justify-between`}
        >
          <div className='flex flex-col gap-3'>
            <h2 className='text-sm flex items-center gap-3'>
              <span>Episodes:</span>
              <span className='text-main-red font-bold'>
                {info.episodes ? (
                  info.episodes
                ) : (
                  <span className='text-[grey]'>Updating...</span>
                )}
              </span>
            </h2>
            <p className='text-sm flex items-center gap-3'>
              <span>Status:</span>
              <span className='text-main-red font-bold'>
                {info.status ? (
                  info.status
                ) : (
                  <span className='text-[grey]'>Updating...</span>
                )}
              </span>
            </p>
            <p className='text-sm flex items-center gap-3'>
              <span>Duration:</span>
              <span className='text-main-red font-bold'>
                {info.duration ? (
                  info.duration
                ) : (
                  <span className='text-[grey]'>Updating...</span>
                )}
              </span>
            </p>
            <p className='text-sm flex items-center gap-3'>
              <span>Season:</span>
              <span className='text-main-red capitalize font-bold'>
                {info.season ? (
                  info.season
                ) : (
                  <span className='text-[grey]'>Updating...</span>
                )}
              </span>
            </p>
            <p className='text-sm flex items-center gap-3'>
              <span>Themes:</span>
              <span className='text-main-red font-bold'>
                {info.themes?.length > 0 ? (
                  info.themes.map((theme, index) => (
                    <span key={index}>
                      {index !== 0 && ", "} {theme.name}
                    </span>
                  ))
                ) : (
                  <span className='text-[grey]'>Updating...</span>
                )}
              </span>
            </p>
          </div>
          <div className='flex flex-col gap-3'>
            <h2 className='text-sm flex items-start gap-3'>
              <span>Genres:</span>
              <span className='text-main-red font-bold'>
                {info.genres?.length > 0 ? (
                  info.genres.map((genre, index) => (
                    <span key={index}>
                      {index !== 0 && ", "} {genre.name}
                    </span>
                  ))
                ) : (
                  <span className='text-[grey]'>Updating...</span>
                )}
              </span>
            </h2>
            <p className='text-sm flex items-start gap-3'>
              <span>Rating:</span>
              <span className='text-main-red font-bold'>
                {info.rating ? (
                  info.rating
                ) : (
                  <span className='text-[grey]'>Updating...</span>
                )}
              </span>
            </p>
            <p className='text-sm flex items-start gap-3'>
              <span>Rank:</span>
              <span className='text-main-red font-bold'>
                {info.rank ? (
                  info.rank
                ) : (
                  <span className='text-[grey]'>Updating...</span>
                )}
              </span>
            </p>
            <p className='text-sm flex items-start gap-3'>
              <span>Studio:</span>
              <span className='text-main-red font-bold'>
                {info.studios?.length > 0 ? (
                  info.studios.map((studio, index) => (
                    <span key={index}>
                      {index !== 0 && ", "} {studio.name}
                    </span>
                  ))
                ) : (
                  <span>Updating...</span>
                )}
              </span>
            </p>
            <p className='text-sm flex items-start gap-3'>
              <span>Favorite:</span>
              <span className='text-main-red font-bold'>
                {info.favorites ? (
                  info.favorites.toLocaleString()
                ) : (
                  <span className='text-[grey]'>Updating...</span>
                )}
              </span>
            </p>
          </div>
        </div>
        <Review />
      </div>
    );
  } else if (selected === "Character" && detail) {
    return (
      <div className={`${darkMode ? "dark-mode" : "light-mode"}`}>
        <div className='flex max-h-[100vh] flex-wrap justify-between mt-4 gap-2 max-w-full'>
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
      <div
        className={`w-full ${
          darkMode ? "bg-[#0f1416]" : "bg-[#ccc]"
        } mt-4 p-4 px-10 flex justify-between`}
      >
        {info.trailer.embed_url === null ? (
          <div className='text-xl'>No Trailer</div>
        ) : (
          <iframe
            height='515'
            src={info.trailer.embed_url}
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            className='z-10 w-full'
          ></iframe>
        )}
      </div>
    );
  } else if (selected === "Image") {
    return (
      <div className='mt-4 w-full flex flex-wrap gap-4 max-w-full'>
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
        <div className='flex min-h-[100vh] flex-wrap justify-between mt-4 gap-4 max-w-full'>
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

export default RenderMovie;
