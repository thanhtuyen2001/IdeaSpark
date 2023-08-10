
import React from 'react'
import Link from 'next/link'


const Form = ({ type, post, setPost, submitting, handleSubmit, setImgFile }) => {
  
  
  const setFile = async (e) => {
    const file = e.target.files[0];
    // console.log(file);
    setImgFile(file);
  }

  return (
    <section className='w-full max-w-full flex-start flex-col '>
      <h1 className='head_text text-left'>
        <span className='blue-gradient'>{type} Post</span>
      </h1>
      <p className='desc text-left max-w-md'>create amazing post and sharing it with the world,.... blebleble</p>

      <form className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
        onSubmit={handleSubmit}
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your Post Prompt
          </span>

          <textarea
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            value={post.prompt}
            required
            className='form_textarea '
          />
        </label>

    {/* upload photo */}
    {
      type === 'Create' && (
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700 mr-4'>
            Your Photo
          </span>

          <input type="file" 
            placeholder='upload image'
            required
            onChange={ (e) => {
              setFile(e);
            }}
          />
        </label>
      ) 
    }
    
    {/* upload photo */}


        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>Field of Prompt <span className='font-normal'>#javascript</span></span>
          <input type="text" className='form_input'
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            value={post.tag}

          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel
          </Link>
          <button
            disabled={submitting}
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? 'isSubmitting' : `${type}`}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form