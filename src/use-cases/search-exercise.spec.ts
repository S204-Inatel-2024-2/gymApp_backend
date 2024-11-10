import { expect, describe, it, beforeEach } from 'vitest'
import { SearchExercisesUseCase } from './search-exercise'
import { InMemoryExerciseRepository } from '@/repository/in-memory/in-memory-exercises-repository'

let exercisesRepository: InMemoryExerciseRepository
let sut: SearchExercisesUseCase

describe('Search Exercises Use Case', () => {
  beforeEach(() => {
    exercisesRepository = new InMemoryExerciseRepository()
    sut = new SearchExercisesUseCase(exercisesRepository)
  })

  it('should be able to search for exercises by name', async () => {
    await exercisesRepository.create({
      id_exercise: '1',
      name: 'Supino Reto',
      description: 'Exercício para peitoral',
      difficulty: 'BEGINNER',
      requires_equipment: true,
    })
    await exercisesRepository.create({
      id_exercise: '2',
      name: 'Agachamento Livre',
      description: 'Exercício para pernas',
      difficulty: 'INTERMEDIATE',
      requires_equipment: true,
    })

    // Executamos o caso de uso com o termo de busca 'Supino'
    const { exercises } = await sut.execute({ query: 'Supino' })

    // Verificamos se o exercício correto foi retornado
    expect(exercises).toHaveLength(1)
    expect(exercises[0].name).toEqual('Supino Reto')
  })

  it('should return an empty array if no exercises match the query', async () => {
    // Criamos um exercício de exemplo
    await exercisesRepository.create({
      id_exercise: '1',
      name: 'Supino Reto',
      description: 'Exercício para peitoral',
      difficulty: 'BEGINNER',
      requires_equipment: true,
    })

    // Executamos o caso de uso com um termo que não existe
    const { exercises } = await sut.execute({ query: 'Corrida' })

    // Verificamos se o resultado é um array vazio
    expect(exercises).toHaveLength(0)
  })
})
