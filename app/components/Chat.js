export default function Chat(props) {
  const {loading, value, onChange, onSubmit, children} = props;

  return(
    <section>
      <div>{children}</div>
      <form onSubmit={onSubmit}>
        {loading && <p>Loading...</p>}
        <input
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
