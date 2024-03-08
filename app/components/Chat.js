export default function Chat(props) {
  const {loading, value, onChange, onSubmit, children} = props;

  return(
    <section>
      <div
        className="max-h-30vh relative overflow-y-scroll mb-2"
      >{children}</div>
      <form onSubmit={onSubmit}>
        {loading && <p>Loading...</p>}
        <input
          className="w-full border-2 p-2 rounded-xl"
          value={value}
          placeholder={'hi'}
          onChange={onChange}
          disabled={loading}
          autoFocus
        />
      </form>
    </section>
  )
}
